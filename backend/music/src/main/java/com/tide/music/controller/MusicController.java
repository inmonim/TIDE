package com.tide.music.controller;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MusicController {

    private Environment env;

    public MusicController(Environment env) {
        this.env = env;
    }

    @GetMapping("/health_check")
    public String status() {
        return String.format("Health check: %s", env.getProperty("local.server.port"));
    }
}
