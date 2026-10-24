package org.spring.gamechartprojects.controller;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.spring.gamechartprojects.dto.GameResponse;
import org.spring.gamechartprojects.dto.LeaderboardEntryResponse;
import org.spring.gamechartprojects.dto.MatchHistoryEntryResponse;
import org.spring.gamechartprojects.dto.MatchRegistrationRequest;
import org.spring.gamechartprojects.dto.PlayerResponse;
import org.spring.gamechartprojects.dto.ScoreRankingEntryResponse;
import org.spring.gamechartprojects.entity.Match;
import org.spring.gamechartprojects.entity.Player;
import org.spring.gamechartprojects.exception.ResourceNotFoundException;
import org.spring.gamechartprojects.service.CatalogService;
import org.spring.gamechartprojects.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({GameController.class, PlayerController.class, MatchController.class})
@WithMockUser
class ApiControllerTest {

    @Autowired
    private MockMvc mvc;
    @MockitoBean
    private MatchService matchService;
    @MockitoBean
    private CatalogService catalogService;

    @Test
    void listsGamesWithDefaultPaginationAndWithoutJpaRelations() throws Exception {
        when(catalogService.getGames(0, 20)).thenReturn(new PageImpl<>(
                List.of(new GameResponse(10L, "La Spezia")), PageRequest.of(0, 20), 1));

        mvc.perform(get("/api/v1/games"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(10))
                .andExpect(jsonPath("$.content[0].name").value("La Spezia"))
                .andExpect(jsonPath("$.content[0].matches").doesNotExist())
                .andExpect(jsonPath("$.page.number").value(0))
                .andExpect(jsonPath("$.page.size").value(20))
                .andExpect(jsonPath("$.page.totalElements").value(1));
    }

    @Test
    void listsPlayersWithRequestedPagination() throws Exception {
        when(catalogService.getPlayers(1, 1)).thenReturn(new PageImpl<>(
                List.of(new PlayerResponse(2L, "Luca", "Bianchi")), PageRequest.of(1, 1), 3));

        mvc.perform(get("/api/v1/players").param("page", "1").param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].surname").value("Bianchi"))
                .andExpect(jsonPath("$.page.number").value(1))
                .andExpect(jsonPath("$.page.totalPages").value(3));
    }

    @Test
    void exposesTheAnnualLeaderboard() throws Exception {
        when(matchService.getLeaderboard(10L, 2026, 0, 20)).thenReturn(new PageImpl<>(List.of(
                new LeaderboardEntryResponse(1, 2L, "Luca", "Bianchi",
                        LocalDateTime.of(2026, 10, 24, 12, 0), 5)), PageRequest.of(0, 20), 1));

        mvc.perform(get("/api/v1/games/10/leaderboard").param("year", "2026"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].position").value(1))
                .andExpect(jsonPath("$.content[0].wins").value(5))
                .andExpect(jsonPath("$.content[0].lastWinAt").exists());
        verify(matchService).getLeaderboard(10L, 2026, 0, 20);
    }

    @Test
    void exposesHistoryWithoutRequiringAYear() throws Exception {
        when(matchService.getMatchHistory(10L, null, 0, 20)).thenReturn(new PageImpl<>(List.of(
                new MatchHistoryEntryResponse(3L, 4L, LocalDateTime.of(2026, 10, 24, 12, 0),
                        2L, "Luca", "Bianchi", -3, true)), PageRequest.of(0, 20), 1));

        mvc.perform(get("/api/v1/games/10/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].score").value(-3))
                .andExpect(jsonPath("$.content[0].winner").value(true));
        verify(matchService).getMatchHistory(10L, null, 0, 20);
    }

    @Test
    void forwardsTheOptionalHistoryYearAndPagination() throws Exception {
        when(matchService.getMatchHistory(10L, 2026, 2, 5))
                .thenReturn(new PageImpl<>(List.of(), PageRequest.of(2, 5), 20));

        mvc.perform(get("/api/v1/games/10/history")
                        .param("year", "2026").param("page", "2").param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page.number").value(2));
        verify(matchService).getMatchHistory(10L, 2026, 2, 5);
    }

    @Test
    void exposesIndividualScoreRankingsIncludingNonWinners() throws Exception {
        when(matchService.getScoreRanking(10L, null, 0, 20)).thenReturn(new PageImpl<>(List.of(
                new ScoreRankingEntryResponse(1, 3L, 4L, LocalDateTime.of(2026, 10, 24, 12, 0),
                        2L, "Luca", "Bianchi", -8, false)), PageRequest.of(0, 20), 1));

        mvc.perform(get("/api/v1/games/10/score-ranking"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].position").value(1))
                .andExpect(jsonPath("$.content[0].score").value(-8))
                .andExpect(jsonPath("$.content[0].winner").value(false));
    }

    @Test
    void forwardsScoreRankingFilters() throws Exception {
        when(matchService.getScoreRanking(10L, 2025, 1, 2))
                .thenReturn(new PageImpl<>(List.of(), PageRequest.of(1, 2), 5));

        mvc.perform(get("/api/v1/games/10/score-ranking")
                        .param("year", "2025").param("page", "1").param("size", "2"))
                .andExpect(status().isOk());
        verify(matchService).getScoreRanking(10L, 2025, 1, 2);
    }

    @Test
    void requiresAYearForTheLeaderboard() throws Exception {
        mvc.perform(get("/api/v1/games/10/leaderboard"))
                .andExpect(status().isBadRequest());
        verifyNoInteractions(matchService, catalogService);
    }

    @Test
    void rejectsNonNumericYearsBeforeCallingTheService() throws Exception {
        mvc.perform(get("/api/v1/games/10/history").param("year", "invalid"))
                .andExpect(status().isBadRequest());
        verifyNoInteractions(matchService, catalogService);
    }

    @Test
    void returnsNotFoundWithAnErrorDetailForUnknownGames() throws Exception {
        when(matchService.getLeaderboard(99L, 2026, 0, 20))
                .thenThrow(new ResourceNotFoundException("Game not found"));

        mvc.perform(get("/api/v1/games/99/leaderboard").param("year", "2026"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentTypeCompatibleWith("application/problem+json"))
                .andExpect(jsonPath("$.detail").value("Game not found"));
    }

    @Test
    void returnsBadRequestWithADetailForInvalidPagination() throws Exception {
        when(catalogService.getPlayers(0, 101))
                .thenThrow(new IllegalArgumentException("Page size must be between 1 and 100"));

        mvc.perform(get("/api/v1/players").param("size", "101"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value("Page size must be between 1 and 100"));
    }

    @Test
    @WithAnonymousUser
    void keepsAuthenticationRequired() throws Exception {
        mvc.perform(get("/api/v1/games").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
        verifyNoInteractions(matchService, catalogService);
    }

    @Test
    void keepsCsrfProtectionForRegistration() throws Exception {
        mvc.perform(post("/api/v1/matches").contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isForbidden());
        verifyNoInteractions(matchService);
    }

    @Test
    void registersMatchesWithTheManualWinnerContractAndReturnsOnlyTheResponseDto() throws Exception {
        Player winner = new Player();
        winner.setId(1L);
        Match saved = new Match();
        saved.setId(99L);
        saved.setRegisteredAt(LocalDateTime.of(2026, 10, 24, 12, 0));
        saved.setWinners(List.of(winner));
        when(matchService.registerMatch(any(MatchRegistrationRequest.class))).thenReturn(saved);

        mvc.perform(post("/api/v1/matches").with(csrf()).contentType(MediaType.APPLICATION_JSON).content("""
                        {"gameId":10,"winnerIds":[1],"playerScores":[{"playerId":1,"score":-3}]}
                        """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.matchId").value(99))
                .andExpect(jsonPath("$.winnersIds[0]").value(1))
                .andExpect(jsonPath("$.matchResults").doesNotExist());

        ArgumentCaptor<MatchRegistrationRequest> captor = ArgumentCaptor.forClass(MatchRegistrationRequest.class);
        verify(matchService).registerMatch(captor.capture());
        assertThat(captor.getValue().gameId()).isEqualTo(10L);
        assertThat(captor.getValue().winnerIds()).containsExactly(1L);
        assertThat(captor.getValue().playerScores().getFirst().score()).isEqualTo(-3);
    }
}
