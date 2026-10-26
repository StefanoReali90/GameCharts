package org.spring.gamechartprojects.repository.projection;

import java.time.LocalDateTime;

public interface MatchResultProjection {
    Long getResultId();
    Long getMatchId();
    LocalDateTime getRegisteredAt();
    Long getPlayerId();
    String getName();
    String getSurname();
    Integer getScore();
    Boolean getWinner();
}
