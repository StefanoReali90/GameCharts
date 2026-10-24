package org.spring.gamechartprojects.service;

import lombok.RequiredArgsConstructor;
import org.spring.gamechartprojects.dto.MatchRegistrationRequest;
import org.spring.gamechartprojects.entity.Match;
import org.spring.gamechartprojects.entity.MatchResult;
import org.spring.gamechartprojects.entity.Player;
import org.spring.gamechartprojects.repository.GameRepository;
import org.spring.gamechartprojects.repository.MatchRepository;
import org.spring.gamechartprojects.repository.PlayerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final GameRepository gameRepository;
    private final MatchRepository matchRepository;
    private final PlayerRepository playerRepository;

    @Transactional
    public void registerMatch(MatchRegistrationRequest request){
        HashSet<Long> players = new HashSet<>();
        if (request == null || request.playerScores() == null || request.gameId() == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }
        Match match = new Match();
        match.setGame(gameRepository.findById(request.gameId()).orElseThrow(() -> new RuntimeException("Game not found")));
        if(request.playerScores().isEmpty()){
            throw new IllegalArgumentException("Player scores cannot be empty");
        }
        for(var playerScoreRequest : request.playerScores()){
            if(playerScoreRequest == null){
                throw new IllegalArgumentException("PlayerScoreRequest cannot be null");
            }
            if (playerScoreRequest.score() == null) {
                throw new IllegalArgumentException("Player score cannot be null");
            }
            if (playerScoreRequest.playerId() == null) {
                throw new IllegalArgumentException("Player ID cannot be null");
            }
            Player playerIds = playerRepository.findById(playerScoreRequest.playerId()).orElseThrow(() -> new RuntimeException("Player not found"));
            MatchResult matchResult = new MatchResult();
            boolean playerId = players.add(playerIds.getId());

            matchResult.setPlayer(playerIds);
            matchResult.setScore(playerScoreRequest.score());
            if (!playerId) {
                throw new IllegalArgumentException("Player already added to match");
            }

            match.addMatchResult(matchResult);
        }
        if(request.callerId() == null) {
            throw new IllegalArgumentException("Caller not found");
        }
        if(!players.contains(request.callerId())){
            throw new IllegalArgumentException("Caller must be one of the players in the match");
        }
        match.setCaller(playerRepository.findById(request.callerId()).orElseThrow(() -> new RuntimeException("Caller not found")));
        Integer minScore = match.getMatchResults().stream().mapToInt(MatchResult::getScore).min().orElseThrow(() -> new RuntimeException("No scores found"));
        ArrayList<Player> winners = new ArrayList<>(match.getMatchResults().stream().filter(mr -> mr.getScore().equals(minScore)).map(MatchResult::getPlayer).toList());
        if(winners.size() > 1){
            winners.remove(match.getCaller());
        }
        match.setWinners(winners);
        match.setRegisteredAt(LocalDateTime.now(ZoneId.of("Europe/Rome")));


        matchRepository.save(match);

    }


}
