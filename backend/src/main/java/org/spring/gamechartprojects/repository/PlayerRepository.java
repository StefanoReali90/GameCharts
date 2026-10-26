package org.spring.gamechartprojects.repository;

import org.spring.gamechartprojects.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface PlayerRepository extends JpaRepository<Player,Long> {
}
