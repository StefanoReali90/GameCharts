package org.spring.gamechartprojects.controller;

import lombok.RequiredArgsConstructor;
import org.spring.gamechartprojects.dto.GameResponse;
import org.spring.gamechartprojects.dto.LeaderboardEntryResponse;
import org.spring.gamechartprojects.dto.MatchHistoryEntryResponse;
import org.spring.gamechartprojects.dto.ScoreRankingEntryResponse;
import org.spring.gamechartprojects.service.CatalogService;
import org.spring.gamechartprojects.service.MatchService;
import org.springframework.data.web.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/games")
public class GameController {

    private final CatalogService catalogService;
    private final MatchService matchService;

    @GetMapping
    public PagedModel<GameResponse> getGames(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "20") int size) {
        return new PagedModel<>(catalogService.getGames(page, size));
    }

    @GetMapping("/{gameId}/leaderboard")
    public PagedModel<LeaderboardEntryResponse> getLeaderboard(@PathVariable Long gameId,
                                                            @RequestParam int year,
                                                            @RequestParam(defaultValue = "0") int page,
                                                            @RequestParam(defaultValue = "20") int size) {
        return new PagedModel<>(matchService.getLeaderboard(gameId, year, page, size));
    }

    @GetMapping("/{gameId}/history")
    public PagedModel<MatchHistoryEntryResponse> getMatchHistory(@PathVariable Long gameId,
                                                              @RequestParam(required = false) Integer year,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "20") int size) {
        return new PagedModel<>(matchService.getMatchHistory(gameId, year, page, size));
    }

    @GetMapping("/{gameId}/score-ranking")
    public PagedModel<ScoreRankingEntryResponse> getScoreRanking(@PathVariable Long gameId,
                                                              @RequestParam(required = false) Integer year,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "20") int size) {
        return new PagedModel<>(matchService.getScoreRanking(gameId, year, page, size));
    }
}
