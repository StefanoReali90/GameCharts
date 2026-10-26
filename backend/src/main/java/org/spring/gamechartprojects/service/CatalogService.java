package org.spring.gamechartprojects.service;

import lombok.RequiredArgsConstructor;
import org.spring.gamechartprojects.dto.GameResponse;
import org.spring.gamechartprojects.dto.PlayerResponse;
import org.spring.gamechartprojects.repository.GameRepository;
import org.spring.gamechartprojects.repository.PlayerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CatalogService {

    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;

    public Page<GameResponse> getGames(int page, int size) {
        validatePagination(page, size);
        return gameRepository.findAll(PageRequest.of(page, size, Sort.by("name", "id")))
                .map(game -> new GameResponse(game.getId(), game.getName()));
    }

    public Page<PlayerResponse> getPlayers(int page, int size) {
        validatePagination(page, size);
        return playerRepository.findAll(PageRequest.of(page, size, Sort.by("surname", "name", "id")))
                .map(player -> new PlayerResponse(player.getId(), player.getName(), player.getSurname()));
    }

    private void validatePagination(int page, int size) {
        if (page < 0) {
            throw new IllegalArgumentException("Page cannot be negative");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
    }
}
