package com.tide.music.controller.music;

import com.tide.music.service.music.MusicService;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MusicController {

    private Environment env;
    private MusicService musicService;

    public MusicController(Environment env, MusicService musicService) {
        this.env = env;
        this.musicService = musicService;
    }

//    @PostMapping("/search")
//    public

}
