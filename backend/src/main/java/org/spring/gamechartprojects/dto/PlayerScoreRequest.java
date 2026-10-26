package org.spring.gamechartprojects.dto;

public record PlayerScoreRequest(
        Long playerId,
        Integer score
) {


}
