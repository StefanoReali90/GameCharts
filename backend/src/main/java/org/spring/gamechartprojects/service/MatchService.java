package org.spring.gamechartprojects.service;

import lombok.RequiredArgsConstructor;
import org.spring.gamechartprojects.dto.MatchRegistrationRequest;
import org.spring.gamechartprojects.dto.LeaderboardEntryResponse;
import org.spring.gamechartprojects.dto.MatchHistoryEntryResponse;
import org.spring.gamechartprojects.dto.PlayerScoreRequest;
import org.spring.gamechartprojects.dto.ScoreRankingEntryResponse;
import org.spring.gamechartprojects.entity.Match;
import org.spring.gamechartprojects.entity.MatchResult;
import org.spring.gamechartprojects.entity.Player;
import org.spring.gamechartprojects.exception.ResourceNotFoundException;
import org.spring.gamechartprojects.repository.GameRepository;
import org.spring.gamechartprojects.repository.MatchRepository;
import org.spring.gamechartprojects.repository.PlayerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MatchService {

    private static final int MAX_PAGE_SIZE = 100;

    private final GameRepository gameRepository;
    private final MatchRepository matchRepository;
    private final PlayerRepository playerRepository;

    @Transactional
    public Match registerMatch(MatchRegistrationRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }
        if (request.gameId() == null) {
            throw new IllegalArgumentException("Game ID cannot be null");
        }
        if (request.playerScores() == null || request.playerScores().isEmpty()) {
            throw new IllegalArgumentException("Player scores cannot be empty");
        }
        if (request.winnerIds() == null || request.winnerIds().isEmpty()) {
            throw new IllegalArgumentException("At least one winner must be selected");
        }

        Set<Long> participantIds = new HashSet<>();
        for (PlayerScoreRequest playerScore : request.playerScores()) {
            if (playerScore == null) {
                throw new IllegalArgumentException("PlayerScoreRequest cannot be null");
            }
            if (playerScore.playerId() == null) {
                throw new IllegalArgumentException("Player ID cannot be null");
            }
            if (playerScore.score() == null) {
                throw new IllegalArgumentException("Player score cannot be null");
            }
            if (!participantIds.add(playerScore.playerId())) {
                throw new IllegalArgumentException("Player already added to match");
            }
        }

        Set<Long> winnerIds = new HashSet<>();
        for (Long winnerId : request.winnerIds()) {
            if (winnerId == null) {
                throw new IllegalArgumentException("Winner ID cannot be null");
            }
            if (!winnerIds.add(winnerId)) {
                throw new IllegalArgumentException("Winner already selected for match");
            }
            if (!participantIds.contains(winnerId)) {
                throw new IllegalArgumentException("Winner must be one of the players in the match");
            }
        }

        Match match = new Match();
        match.setGame(gameRepository.findById(request.gameId())
                .orElseThrow(() -> new ResourceNotFoundException("Game not found")));

        List<Player> winners = new ArrayList<>();
        for (PlayerScoreRequest playerScore : request.playerScores()) {
            Player player = playerRepository.findById(playerScore.playerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Player not found: " + playerScore.playerId()));
            MatchResult matchResult = new MatchResult();
            matchResult.setPlayer(player);
            matchResult.setScore(playerScore.score());
            match.addMatchResult(matchResult);

            if (winnerIds.contains(player.getId())) {
                winners.add(player);
            }
        }

        match.setWinners(winners);
        match.setRegisteredAt(LocalDateTime.now(ZoneId.of("Europe/Rome")));
        return matchRepository.save(match);
    }

    @Transactional(readOnly = true)
    public Page<LeaderboardEntryResponse> getLeaderboard(Long gameId, int year, int page, int size) {
        ReadParameters parameters = validateReadRequest(gameId, year, page, size);
        return matchRepository.findLeaderboard(gameId, parameters.fromDate(), parameters.toDate(), parameters.pageable())
                .map(row -> new LeaderboardEntryResponse(row.getPosition(), row.getPlayerId(),
                        row.getName(), row.getSurname(), row.getLastWinAt(), row.getWins()));
    }

    /** A null year includes the complete history of the selected game. */
    @Transactional(readOnly = true)
    public Page<MatchHistoryEntryResponse> getMatchHistory(Long gameId, Integer year, int page, int size) {
        ReadParameters parameters = validateReadRequest(gameId, year, page, size);
        return matchRepository.findMatchHistory(gameId, parameters.fromDate(), parameters.toDate(), parameters.pageable())
                .map(row -> new MatchHistoryEntryResponse(row.getResultId(), row.getMatchId(), row.getRegisteredAt(),
                        row.getPlayerId(), row.getName(), row.getSurname(), row.getScore(), row.getWinner()));
    }

    /** Ranks individual results; a null year includes results from all years. */
    @Transactional(readOnly = true)
    public Page<ScoreRankingEntryResponse> getScoreRanking(Long gameId, Integer year, int page, int size) {
        ReadParameters parameters = validateReadRequest(gameId, year, page, size);
        return matchRepository.findScoreRanking(gameId, parameters.fromDate(), parameters.toDate(), parameters.pageable())
                .map(row -> new ScoreRankingEntryResponse(row.getPosition(), row.getResultId(), row.getMatchId(),
                        row.getRegisteredAt(), row.getPlayerId(), row.getName(), row.getSurname(),
                        row.getScore(), row.getWinner()));
    }

    private ReadParameters validateReadRequest(Long gameId, Integer year, int page, int size) {
        if (gameId == null) {
            throw new IllegalArgumentException("Game ID cannot be null");
        }
        if (year != null && (year < 1 || year > 9999)) {
            throw new IllegalArgumentException("Year must be between 1 and 9999");
        }
        if (page < 0) {
            throw new IllegalArgumentException("Page cannot be negative");
        }
        if (size < 1 || size > MAX_PAGE_SIZE) {
            throw new IllegalArgumentException("Page size must be between 1 and " + MAX_PAGE_SIZE);
        }
        if (!gameRepository.existsById(gameId)) {
            throw new ResourceNotFoundException("Game not found");
        }

        LocalDateTime fromDate = year == null ? null : LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime toDate = fromDate == null ? null : fromDate.plusYears(1);
        return new ReadParameters(fromDate, toDate, PageRequest.of(page, size));
    }

    private record ReadParameters(LocalDateTime fromDate, LocalDateTime toDate, PageRequest pageable) {
    }
}
