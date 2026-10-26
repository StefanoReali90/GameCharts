package org.spring.gamechartprojects.dto;

import java.time.LocalDateTime;
import java.util.List;

public record MatchRegistrationResponse(
        Long matchId,
        LocalDateTime registeredAt,
        List<Long> winnersIds

) {
}
