package org.spring.gamechartprojects.repository;

import org.spring.gamechartprojects.repository.projection.LeaderboardProjection;
import org.spring.gamechartprojects.repository.projection.MatchResultProjection;
import org.spring.gamechartprojects.repository.projection.ScoreRankingProjection;
import org.spring.gamechartprojects.entity.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query(value = """
            SELECT RANK() OVER (ORDER BY COUNT(mw.player_id) DESC) AS position,
                   p.id AS "playerId", p.name AS name, p.surname AS surname,
                   MAX(CASE WHEN mw.player_id IS NOT NULL THEN m.registered_at END) AS "lastWinAt",
                   COUNT(mw.player_id) AS wins
            FROM match_results mr
            JOIN matches m ON m.id = mr.match_id
            JOIN players p ON p.id = mr.player_id
            LEFT JOIN match_winners mw ON mw.match_id = mr.match_id AND mw.player_id = mr.player_id
            WHERE m.game_id = :gameId
              AND m.registered_at >= :fromDate AND m.registered_at < :toDate
            GROUP BY p.id, p.name, p.surname
            ORDER BY COUNT(mw.player_id) DESC, p.surname ASC, p.name ASC, p.id ASC
            """, countQuery = """
            SELECT COUNT(DISTINCT mr.player_id)
            FROM match_results mr
            JOIN matches m ON m.id = mr.match_id
            WHERE m.game_id = :gameId
              AND m.registered_at >= :fromDate AND m.registered_at < :toDate
            """, nativeQuery = true)
    Page<LeaderboardProjection> findLeaderboard(@Param("gameId") Long gameId,
                                               @Param("fromDate") LocalDateTime fromDate,
                                               @Param("toDate") LocalDateTime toDate,
                                               Pageable pageable);

    @Query(value = """
            SELECT mr.id AS "resultId", m.id AS "matchId", m.registered_at AS "registeredAt",
                   p.id AS "playerId", p.name AS name, p.surname AS surname, mr.score AS score,
                   (mw.player_id IS NOT NULL) AS winner
            FROM match_results mr
            JOIN matches m ON m.id = mr.match_id
            JOIN players p ON p.id = mr.player_id
            LEFT JOIN match_winners mw ON mw.match_id = mr.match_id AND mw.player_id = mr.player_id
            WHERE m.game_id = :gameId
              AND (CAST(:fromDate AS timestamp) IS NULL OR m.registered_at >= :fromDate)
              AND (CAST(:toDate AS timestamp) IS NULL OR m.registered_at < :toDate)
            ORDER BY m.registered_at DESC, m.id DESC, p.id ASC
            """, countQuery = """
            SELECT COUNT(*)
            FROM match_results mr
            JOIN matches m ON m.id = mr.match_id
            WHERE m.game_id = :gameId
              AND (CAST(:fromDate AS timestamp) IS NULL OR m.registered_at >= :fromDate)
              AND (CAST(:toDate AS timestamp) IS NULL OR m.registered_at < :toDate)
            """, nativeQuery = true)
    Page<MatchResultProjection> findMatchHistory(@Param("gameId") Long gameId,
                                               @Param("fromDate") LocalDateTime fromDate,
                                               @Param("toDate") LocalDateTime toDate,
                                               Pageable pageable);

    @Query(value = """
            SELECT RANK() OVER (ORDER BY mr.score ASC) AS position,
                   mr.id AS "resultId", m.id AS "matchId", m.registered_at AS "registeredAt",
                   p.id AS "playerId", p.name AS name, p.surname AS surname, mr.score AS score,
                   (mw.player_id IS NOT NULL) AS winner
            FROM match_results mr
            JOIN matches m ON m.id = mr.match_id
            JOIN players p ON p.id = mr.player_id
            LEFT JOIN match_winners mw ON mw.match_id = mr.match_id AND mw.player_id = mr.player_id
            WHERE m.game_id = :gameId
              AND (CAST(:fromDate AS timestamp) IS NULL OR m.registered_at >= :fromDate)
              AND (CAST(:toDate AS timestamp) IS NULL OR m.registered_at < :toDate)
            ORDER BY mr.score ASC, m.registered_at DESC, m.id DESC, p.id ASC
            """, countQuery = """
            SELECT COUNT(*)
            FROM match_results mr
            JOIN matches m ON m.id = mr.match_id
            WHERE m.game_id = :gameId
              AND (CAST(:fromDate AS timestamp) IS NULL OR m.registered_at >= :fromDate)
              AND (CAST(:toDate AS timestamp) IS NULL OR m.registered_at < :toDate)
            """, nativeQuery = true)
    Page<ScoreRankingProjection> findScoreRanking(@Param("gameId") Long gameId,
                                                @Param("fromDate") LocalDateTime fromDate,
                                                @Param("toDate") LocalDateTime toDate,
                                                Pageable pageable);
}
