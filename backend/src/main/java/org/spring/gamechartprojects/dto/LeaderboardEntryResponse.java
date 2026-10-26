package org.spring.gamechartprojects.dto;

import java.time.LocalDateTime;

public record LeaderboardEntryResponse(
        long position,
        Long playerId,
        String name,
        String surname,
        LocalDateTime lastWinAt,
        long wins
) {
}
