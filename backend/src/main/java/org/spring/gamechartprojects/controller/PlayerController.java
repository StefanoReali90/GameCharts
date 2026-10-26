package org.spring.gamechartprojects.controller;

import lombok.RequiredArgsConstructor;
import org.spring.gamechartprojects.dto.PlayerResponse;
import org.spring.gamechartprojects.service.CatalogService;
import org.springframework.data.web.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/players")
public class PlayerController {

    private final CatalogService catalogService;

    @GetMapping
    public PagedModel<PlayerResponse> getPlayers(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "20") int size) {
        return new PagedModel<>(catalogService.getPlayers(page, size));
    }
}
