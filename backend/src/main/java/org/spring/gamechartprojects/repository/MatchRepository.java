package org.spring.gamechartprojects.repository;

import org.spring.gamechartprojects.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface MatchRepository extends JpaRepository<Match,Long> {
}
