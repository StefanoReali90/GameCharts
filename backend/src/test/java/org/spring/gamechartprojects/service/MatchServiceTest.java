package org.spring.gamechartprojects.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.spring.gamechartprojects.dto.MatchRegistrationRequest;
import org.spring.gamechartprojects.dto.PlayerScoreRequest;
import org.spring.gamechartprojects.entity.Game;
import org.spring.gamechartprojects.entity.Match;
import org.spring.gamechartprojects.entity.MatchResult;
import org.spring.gamechartprojects.entity.Player;
import org.spring.gamechartprojects.exception.ResourceNotFoundException;
import org.spring.gamechartprojects.repository.GameRepository;
import org.spring.gamechartprojects.repository.MatchRepository;
import org.spring.gamechartprojects.repository.PlayerRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MatchServiceTest {

    private static final Long GAME_ID = 10L;

    @Mock
    private GameRepository gameRepository;
    @Mock
    private MatchRepository matchRepository;
    @Mock
    private PlayerRepository playerRepository;
    @InjectMocks
    private MatchService matchService;
    @Captor
    private ArgumentCaptor<Match> matchCaptor;

    @Test
    void savesTheSelectedWinnerEvenWhenAnotherPlayerHasALowerScore() {
        Player selectedWinner = player(1L);
        Player lowestScoringPlayer = player(2L);
        Player zeroScoringPlayer = player(3L);
        Game game = stubGameAndPlayers(selectedWinner, lowestScoringPlayer, zeroScoringPlayer);
        when(matchRepository.save(any(Match.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Match saved = matchService.registerMatch(new MatchRegistrationRequest(
                GAME_ID, List.of(1L), List.of(
                        new PlayerScoreRequest(1L, 8),
                        new PlayerScoreRequest(2L, -3),
                        new PlayerScoreRequest(3L, 0))));

        verify(matchRepository).save(matchCaptor.capture());
        assertThat(saved).isSameAs(matchCaptor.getValue());
        assertThat(saved.getGame()).isSameAs(game);
        assertThat(saved.getWinners()).containsExactly(selectedWinner);
        assertThat(saved.getMatchResults()).extracting(MatchResult::getScore).containsExactly(8, -3, 0);
        assertThat(saved.getMatchResults()).extracting(MatchResult::getPlayer)
                .containsExactly(selectedWinner, lowestScoringPlayer, zeroScoringPlayer);
        assertThat(saved.getMatchResults()).allSatisfy(result -> assertThat(result.getMatch()).isSameAs(saved));
        assertThat(saved.getRegisteredAt()).isNotNull();
        assertThat(saved.getCaller()).isNull();
    }

    @Test
    void savesAllSelectedWinnersWithoutComparingTheirScores() {
        Player firstWinner = player(1L);
        Player lowestScoringPlayer = player(2L);
        Player secondWinner = player(3L);
        stubGameAndPlayers(firstWinner, lowestScoringPlayer, secondWinner);
        when(matchRepository.save(any(Match.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Match saved = matchService.registerMatch(new MatchRegistrationRequest(
                GAME_ID, List.of(3L, 1L), List.of(
                        new PlayerScoreRequest(1L, 5),
                        new PlayerScoreRequest(2L, -8),
                        new PlayerScoreRequest(3L, 0))));

        assertThat(saved.getWinners()).containsExactlyInAnyOrder(firstWinner, secondWinner);
        assertThat(saved.getMatchResults()).hasSize(3);
        verify(matchRepository).save(saved);
    }

    @ParameterizedTest(name = "{0}")
    @MethodSource("invalidRequests")
    void rejectsInvalidRequestsBeforeAccessingRepositories(String scenario, MatchRegistrationRequest request) {
        assertThatThrownBy(() -> matchService.registerMatch(request))
                .isInstanceOf(IllegalArgumentException.class);

        verifyNoInteractions(gameRepository, playerRepository, matchRepository);
    }

    static Stream<Arguments> invalidRequests() {
        List<PlayerScoreRequest> scores = List.of(new PlayerScoreRequest(1L, -3));
        return Stream.of(
                Arguments.of("missing request", (MatchRegistrationRequest) null),
                Arguments.of("missing game ID", new MatchRegistrationRequest(null, List.of(1L), scores)),
                Arguments.of("missing results", new MatchRegistrationRequest(GAME_ID, List.of(1L), null)),
                Arguments.of("empty results", new MatchRegistrationRequest(GAME_ID, List.of(1L), List.of())),
                Arguments.of("null result", new MatchRegistrationRequest(
                        GAME_ID, List.of(1L), Collections.singletonList(null))),
                Arguments.of("missing player ID", new MatchRegistrationRequest(
                        GAME_ID, List.of(1L), List.of(new PlayerScoreRequest(null, -3)))),
                Arguments.of("missing score", new MatchRegistrationRequest(
                        GAME_ID, List.of(1L), List.of(new PlayerScoreRequest(1L, null)))),
                Arguments.of("duplicate participant", new MatchRegistrationRequest(
                        GAME_ID, List.of(1L), List.of(
                                new PlayerScoreRequest(1L, -3), new PlayerScoreRequest(1L, 5)))),
                Arguments.of("missing winners", new MatchRegistrationRequest(GAME_ID, null, scores)),
                Arguments.of("empty winners", new MatchRegistrationRequest(GAME_ID, List.of(), scores)),
                Arguments.of("missing winner ID", new MatchRegistrationRequest(
                        GAME_ID, Collections.singletonList(null), scores)),
                Arguments.of("duplicate winner", new MatchRegistrationRequest(GAME_ID, List.of(1L, 1L), scores)),
                Arguments.of("winner outside participants", new MatchRegistrationRequest(GAME_ID, List.of(2L), scores))
        );
    }

    @Test
    void rejectsAMissingGameWithoutSavingAMatch() {
        when(gameRepository.findById(GAME_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> matchService.registerMatch(new MatchRegistrationRequest(
                GAME_ID, List.of(1L), List.of(new PlayerScoreRequest(1L, -3)))))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Game not found");

        verifyNoInteractions(playerRepository, matchRepository);
    }

    @Test
    void rejectsTheWholeRegistrationWhenOneParticipantDoesNotExist() {
        when(gameRepository.findById(GAME_ID)).thenReturn(Optional.of(new Game()));
        when(playerRepository.findById(1L)).thenReturn(Optional.of(player(1L)));
        when(playerRepository.findById(2L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> matchService.registerMatch(new MatchRegistrationRequest(
                GAME_ID, List.of(1L), List.of(
                        new PlayerScoreRequest(1L, -3), new PlayerScoreRequest(2L, 0)))))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Player not found");

        verifyNoInteractions(matchRepository);
    }

    private Game stubGameAndPlayers(Player... players) {
        Game game = new Game();
        game.setId(GAME_ID);
        when(gameRepository.findById(GAME_ID)).thenReturn(Optional.of(game));
        for (Player player : players) {
            when(playerRepository.findById(player.getId())).thenReturn(Optional.of(player));
        }
        return game;
    }

    private static Player player(Long id) {
        Player player = new Player();
        player.setId(id);
        return player;
    }
}
