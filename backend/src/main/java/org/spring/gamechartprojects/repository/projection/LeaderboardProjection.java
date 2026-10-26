package org.spring.gamechartprojects.repository.projection;

import java.time.LocalDateTime;

public interface LeaderboardProjection {
    Long getPosition();
    Long getPlayerId();
    String getName();
    String getSurname();
    LocalDateTime getLastWinAt();
    Long getWins();
}
