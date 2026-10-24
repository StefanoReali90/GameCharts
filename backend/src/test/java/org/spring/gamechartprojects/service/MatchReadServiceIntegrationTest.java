package org.spring.gamechartprojects.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.spring.gamechartprojects.dto.LeaderboardEntryResponse;
import org.spring.gamechartprojects.dto.MatchHistoryEntryResponse;
import org.spring.gamechartprojects.dto.MatchRegistrationRequest;
import org.spring.gamechartprojects.dto.PlayerScoreRequest;
import org.spring.gamechartprojects.dto.ScoreRankingEntryResponse;
import org.spring.gamechartprojects.entity.Game;
import org.spring.gamechartprojects.entity.Match;
import org.spring.gamechartprojects.entity.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/** Opt in with GAMECHART_DB_TESTS=true; all fixtures live in a disposable, isolated schema. */
@DataJpaTest(showSql = false, properties = "spring.jpa.hibernate.ddl-auto=validate")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(MatchService.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@EnabledIfEnvironmentVariable(named = "GAMECHART_DB_TESTS", matches = "true")
class MatchReadServiceIntegrationTest {

    private static final String TEST_SCHEMA = "gamechart_service_test_" + UUID.randomUUID().toString().replace("-", "");
    private static final String DATABASE_URL = System.getenv().getOrDefault(
            "GAMECHART_TEST_DATABASE_URL", "jdbc:postgresql://127.0.0.1:15433/gamechart");
    private static final String TEST_URL = DATABASE_URL + (DATABASE_URL.contains("?") ? "&" : "?")
            + "currentSchema=" + TEST_SCHEMA;

    @Autowired
    private EntityManager entityManager;
    @Autowired
    private MatchService matchService;

    private Game game;
    private Player anna;
    private Player luca;
    private Player michele;

    @DynamicPropertySource
    static void databaseProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> TEST_URL);
        registry.add("spring.datasource.username", () -> System.getenv("DB_USERNAME"));
        registry.add("spring.datasource.password", () -> System.getenv("DB_PASSWORD"));
        registry.add("spring.flyway.default-schema", () -> TEST_SCHEMA);
        registry.add("spring.flyway.schemas", () -> TEST_SCHEMA);
        registry.add("spring.jpa.properties.hibernate.default_schema", () -> TEST_SCHEMA);
    }

    @AfterAll
    static void removeTestSchema() throws SQLException {
        try (var connection = DriverManager.getConnection(
                DATABASE_URL, System.getenv("DB_USERNAME"), System.getenv("DB_PASSWORD"));
             var statement = connection.createStatement()) {
            statement.execute("DROP SCHEMA IF EXISTS \"" + TEST_SCHEMA + "\" CASCADE");
        }
    }

    @BeforeEach
    void createFixtures() {
        game = game("La Spezia");
        Game otherGame = game("Other game");
        anna = player("Anna", "Rossi");
        luca = player("Luca", "Bianchi");
        michele = player("Michele", "Verdi");
        player("Never", "Played");

        saveMatch(game, LocalDateTime.of(2026, 1, 1, 0, 0), List.of(anna.getId()),
                score(anna, -3), score(luca, 0));
        saveMatch(game, LocalDateTime.of(2026, 2, 10, 12, 0), List.of(anna.getId(), luca.getId()),
                score(anna, 5), score(luca, -4), score(michele, 0));
        saveMatch(game, LocalDateTime.of(2026, 12, 31, 23, 59, 59), List.of(luca.getId()),
                score(anna, 7), score(luca, -4), score(michele, -4));
        saveMatch(game, LocalDateTime.of(2025, 12, 31, 23, 59, 59), List.of(michele.getId()), score(michele, -50));
        saveMatch(game, LocalDateTime.of(2027, 1, 1, 0, 0), List.of(michele.getId()), score(michele, -60));
        saveMatch(otherGame, LocalDateTime.of(2026, 6, 1, 12, 0), List.of(anna.getId()), score(anna, -100));
        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void countsOnlySelectedVictoriesForTheGameAndYearIncludingZeroWinParticipants() {
        var result = matchService.getLeaderboard(game.getId(), 2026, 0, 20);

        assertThat(result.getTotalElements()).isEqualTo(3);
        assertThat(result.getContent()).extracting(LeaderboardEntryResponse::playerId)
                .containsExactly(luca.getId(), anna.getId(), michele.getId());
        assertThat(result.getContent()).extracting(LeaderboardEntryResponse::wins).containsExactly(2L, 2L, 0L);
        assertThat(result.getContent()).extracting(LeaderboardEntryResponse::position).containsExactly(1L, 1L, 3L);
        assertThat(result.getContent().get(0).lastWinAt()).isEqualTo(LocalDateTime.of(2026, 12, 31, 23, 59, 59));
        assertThat(result.getContent().get(1).lastWinAt()).isEqualTo(LocalDateTime.of(2026, 2, 10, 12, 0));
        assertThat(result.getContent().get(2).lastWinAt()).isNull();
    }

    @Test
    void preservesLeaderboardPositionsAndCountsAcrossPages() {
        var second = matchService.getLeaderboard(game.getId(), 2026, 1, 1);
        var third = matchService.getLeaderboard(game.getId(), 2026, 2, 1);

        assertThat(second.getTotalElements()).isEqualTo(3);
        assertThat(second.getContent().getFirst().position()).isEqualTo(1);
        assertThat(third.getContent().getFirst().position()).isEqualTo(3);
        assertThat(third.getContent().getFirst().wins()).isZero();
    }

    @Test
    void returnsRealScoresAndWinnerFlagsInNewestFirstHistory() {
        var result = matchService.getMatchHistory(game.getId(), 2026, 0, 3);

        assertThat(result.getTotalElements()).isEqualTo(8);
        assertThat(result.getTotalPages()).isEqualTo(3);
        assertThat(result.getContent()).extracting(MatchHistoryEntryResponse::score).containsExactly(7, -4, -4);
        assertThat(result.getContent()).extracting(MatchHistoryEntryResponse::winner).containsExactly(false, true, false);
        assertThat(result.getContent()).allSatisfy(row -> {
            assertThat(row.registeredAt()).isEqualTo(LocalDateTime.of(2026, 12, 31, 23, 59, 59));
            assertThat(row.resultId()).isNotNull();
            assertThat(row.matchId()).isNotNull();
        });
    }

    @Test
    void includesEveryYearWhenHistoryHasNoYearFilter() {
        var result = matchService.getMatchHistory(game.getId(), null, 0, 100);

        assertThat(result.getTotalElements()).isEqualTo(10);
        assertThat(result.getContent().getFirst().score()).isEqualTo(-60);
        assertThat(result.getContent().getLast().score()).isEqualTo(-50);
        assertThat(result.getContent()).noneSatisfy(row -> assertThat(row.score()).isEqualTo(-100));
    }

    @Test
    void ranksIndividualPerformancesIncludingNonWinnersAndRepeatedPlayers() {
        var result = matchService.getScoreRanking(game.getId(), 2026, 0, 100);

        assertThat(result.getTotalElements()).isEqualTo(8);
        assertThat(result.getContent()).extracting(ScoreRankingEntryResponse::score)
                .containsExactly(-4, -4, -4, -3, 0, 0, 5, 7);
        assertThat(result.getContent()).extracting(ScoreRankingEntryResponse::position)
                .containsExactly(1L, 1L, 1L, 4L, 5L, 5L, 7L, 8L);
        assertThat(result.getContent().stream().filter(row -> row.playerId().equals(luca.getId()))).hasSize(3);
        assertThat(result.getContent().get(1).winner()).isFalse();
    }

    @Test
    void keepsScoreRanksGlobalWhenPagesSplitATie() {
        var result = matchService.getScoreRanking(game.getId(), 2026, 1, 2);

        assertThat(result.getTotalElements()).isEqualTo(8);
        assertThat(result.getContent()).extracting(ScoreRankingEntryResponse::position).containsExactly(1L, 4L);
        assertThat(result.getContent()).extracting(ScoreRankingEntryResponse::score).containsExactly(-4, -3);
    }

    @Test
    void ranksAllYearsWithoutIncludingOtherGames() {
        var result = matchService.getScoreRanking(game.getId(), null, 0, 100);

        assertThat(result.getTotalElements()).isEqualTo(10);
        assertThat(result.getContent().getFirst().score()).isEqualTo(-60);
        assertThat(result.getContent()).noneSatisfy(row -> assertThat(row.score()).isEqualTo(-100));
    }

    @Test
    void returnsEmptyPagesForAnExistingGameWithoutResultsInTheYear() {
        assertThat(matchService.getLeaderboard(game.getId(), 2028, 0, 20).getTotalElements()).isZero();
        assertThat(matchService.getMatchHistory(game.getId(), 2028, 0, 20).getTotalElements()).isZero();
        assertThat(matchService.getScoreRanking(game.getId(), 2028, 0, 20).getTotalElements()).isZero();
        assertThat(matchService.getLeaderboard(game.getId(), 9999, 0, 20).getTotalElements()).isZero();
    }

    private Game game(String name) {
        Game game = new Game();
        game.setName(name);
        entityManager.persist(game);
        return game;
    }

    private Player player(String name, String surname) {
        Player player = new Player();
        player.setName(name);
        player.setSurname(surname);
        entityManager.persist(player);
        return player;
    }

    private PlayerScoreRequest score(Player player, int score) {
        return new PlayerScoreRequest(player.getId(), score);
    }

    private void saveMatch(Game game, LocalDateTime date, List<Long> winnerIds, PlayerScoreRequest... scores) {
        Match match = matchService.registerMatch(new MatchRegistrationRequest(game.getId(), winnerIds, List.of(scores)));
        match.setRegisteredAt(date);
    }
}
