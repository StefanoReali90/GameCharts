package org.spring.gamechartprojects.dto;

import java.time.LocalDateTime;

public record MatchHistoryEntryResponse(
        Long resultId,
        Long matchId,
        LocalDateTime registeredAt,
        Long playerId,
        String name,
        String surname,
        Integer score,
        boolean winner
) {
}
