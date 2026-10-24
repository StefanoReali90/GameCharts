package org.spring.gamechartprojects.controller;

import lombok.RequiredArgsConstructor;
import org.spring.gamechartprojects.dto.MatchRegistrationRequest;
import org.spring.gamechartprojects.dto.MatchRegistrationResponse;
import org.spring.gamechartprojects.entity.Match;
import org.spring.gamechartprojects.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/matches")
public class MatchController {

    private final MatchService matchService;

    @PostMapping(consumes = "application/json")
    public ResponseEntity<MatchRegistrationResponse> registerMatch(@RequestBody MatchRegistrationRequest request) {
        Match match = matchService.registerMatch(request);
        return ResponseEntity.status(201).body(new MatchRegistrationResponse(
                match.getId(),
                match.getRegisteredAt(),
                match.getWinners().stream().map(player -> player.getId()).toList()
        ));
    }
}