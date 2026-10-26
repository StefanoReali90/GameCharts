package org.spring.gamechartprojects.repository;

import org.spring.gamechartprojects.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
