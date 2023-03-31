package com.tide.music.controller.playlist;

import com.tide.music.request.RequestPlaylist;
import com.tide.music.response.ResponsePlaylist;
import com.tide.music.service.playlist.PlaylistService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class PlaylistController {

    private Environment env;
    private PlaylistService playListService;

    public PlaylistController(Environment env, PlaylistService playListService) {
        this.env = env;
        this.playListService = playListService;
    }

    @GetMapping("/health_check")
    public String status() {
        return String.format("Health check: %s", env.getProperty("local.server.port"));
    }

    // 플레이리스트 추가
    @PostMapping("/playlist")
    public ResponseEntity<String> addPlaylist(@RequestHeader("email") String email,
                                              @RequestBody RequestPlaylist request) {
        playListService.addPlaylist(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("플레이리스트 저장 성공");
    }
    
    // 본인의 플레이리스트 조회
    @GetMapping("/myplaylist")
    public List<ResponsePlaylist> getMyPlaylists(@RequestHeader("email") String email) {
        return playListService.getMyPlaylists(email);
    }
}
