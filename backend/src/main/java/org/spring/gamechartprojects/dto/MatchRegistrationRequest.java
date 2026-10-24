package org.spring.gamechartprojects.dto;

import java.util.List;

public record MatchRegistrationRequest(
        Long gameId,
        Long callerId,
        List<PlayerScoreRequest> playerScores
) {
}
