package org.spring.gamechartprojects.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.spring.gamechartprojects.dto.GameResponse;
import org.spring.gamechartprojects.dto.PlayerResponse;
import org.spring.gamechartprojects.entity.Game;
import org.spring.gamechartprojects.entity.Player;
import org.spring.gamechartprojects.repository.GameRepository;
import org.spring.gamechartprojects.repository.PlayerRepository;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CatalogServiceTest {

    @Mock
    private GameRepository gameRepository;
    @Mock
    private PlayerRepository playerRepository;
    @InjectMocks
    private CatalogService catalogService;

    @Test
    void returnsGameDtosWithStableAlphabeticalPagination() {
        Game game = new Game();
        game.setId(1L);
        game.setName("La Spezia");
        PageRequest pageable = PageRequest.of(0, 20, Sort.by("name", "id"));
        when(gameRepository.findAll(pageable)).thenReturn(new PageImpl<>(List.of(game), pageable, 1));

        var result = catalogService.getGames(0, 20);

        assertThat(result.getContent()).containsExactly(new GameResponse(1L, "La Spezia"));
        assertThat(result.getTotalElements()).isEqualTo(1);
        verifyNoInteractions(playerRepository);
    }

    @Test
    void returnsPlayerDtosSortedBySurnameNameAndId() {
        Player player = new Player();
        player.setId(1L);
        player.setName("Luca");
        player.setSurname("Bianchi");
        PageRequest pageable = PageRequest.of(1, 1, Sort.by("surname", "name", "id"));
        when(playerRepository.findAll(pageable)).thenReturn(new PageImpl<>(List.of(player), pageable, 3));

        var result = catalogService.getPlayers(1, 1);

        assertThat(result.getContent()).containsExactly(new PlayerResponse(1L, "Luca", "Bianchi"));
        assertThat(result.getTotalElements()).isEqualTo(3);
        verifyNoInteractions(gameRepository);
    }

    @ParameterizedTest
    @CsvSource({"-1, 20", "0, 0", "0, -1", "0, 101"})
    void rejectsInvalidPaginationWithoutAccessingRepositories(int page, int size) {
        assertThatThrownBy(() -> catalogService.getGames(page, size)).isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> catalogService.getPlayers(page, size)).isInstanceOf(IllegalArgumentException.class);
        verifyNoInteractions(gameRepository, playerRepository);
    }
}
