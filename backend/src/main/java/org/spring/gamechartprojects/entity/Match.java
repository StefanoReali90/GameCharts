package org.spring.gamechartprojects.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "matches")
@NoArgsConstructor
@Getter
@Setter
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime registeredAt;

    @ManyToOne
    @JoinColumn(name = "caller_id")
    private Player caller;

    @ManyToMany
    @JoinTable(
            name = "match_winners",
            joinColumns = @JoinColumn(name = "match_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"match_id", "player_id"})
    )
    private List<Player> winners;

    @ManyToOne(optional = false)
    @JoinColumn(name = "game_id",nullable = false)
    private Game game;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchResult> matchResults= new ArrayList<>();

    public void addMatchResult(MatchResult matchResult) {
        Objects.requireNonNull(matchResult, "MatchResult cannot be null");
        this.getMatchResults().add(matchResult);
        matchResult.setMatch(this);
    }

}
