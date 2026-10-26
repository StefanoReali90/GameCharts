package org.spring.gamechartprojects.service;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.spring.gamechartprojects.exception.ResourceNotFoundException;
import org.spring.gamechartprojects.repository.GameRepository;
import org.spring.gamechartprojects.repository.MatchRepository;
import org.spring.gamechartprojects.repository.PlayerRepository;

import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MatchReadServiceTest {

    @Mock
    private GameRepository gameRepository;
    @Mock
    private MatchRepository matchRepository;
    @Mock
    private PlayerRepository playerRepository;
    @InjectMocks
    private MatchService matchService;

    @ParameterizedTest
    @MethodSource("invalidReadParameters")
    void rejectsInvalidReadParametersBeforeAccessingTheDatabase(Long gameId, Integer year, int page, int size) {
        assertThatThrownBy(() -> matchService.getMatchHistory(gameId, year, page, size))
                .isInstanceOf(IllegalArgumentException.class);

        verifyNoInteractions(gameRepository, matchRepository, playerRepository);
    }

    static Stream<Arguments> invalidReadParameters() {
        return Stream.of(
                Arguments.of(null, 2026, 0, 20),
                Arguments.of(1L, 0, 0, 20),
                Arguments.of(1L, -1, 0, 20),
                Arguments.of(1L, 10000, 0, 20),
                Arguments.of(1L, 2026, -1, 20),
                Arguments.of(1L, 2026, 0, 0),
                Arguments.of(1L, 2026, 0, -1),
                Arguments.of(1L, 2026, 0, 101)
        );
    }

    @ParameterizedTest
    @ValueSource(strings = {"leaderboard", "history", "scores"})
    void rejectsAnUnknownGameForEveryReadView(String view) {
        when(gameRepository.existsById(42L)).thenReturn(false);

        assertThatThrownBy(() -> {
            switch (view) {
                case "leaderboard" -> matchService.getLeaderboard(42L, 2026, 0, 20);
                case "history" -> matchService.getMatchHistory(42L, null, 0, 20);
                case "scores" -> matchService.getScoreRanking(42L, null, 0, 20);
                default -> throw new IllegalArgumentException("Unexpected test view");
            }
        }).isInstanceOf(ResourceNotFoundException.class);

        verifyNoInteractions(matchRepository, playerRepository);
    }
}
