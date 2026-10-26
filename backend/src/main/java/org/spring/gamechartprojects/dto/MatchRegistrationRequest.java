package org.spring.gamechartprojects.dto;

import java.util.List;

public record MatchRegistrationRequest(
        Long gameId,
        List<Long> winnerIds,
        List<PlayerScoreRequest> playerScores
) {
}
