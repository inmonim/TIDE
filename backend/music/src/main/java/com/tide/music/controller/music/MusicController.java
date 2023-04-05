package com.tide.music.controller.music;

import com.tide.music.request.RequestSearchSong;
import com.tide.music.response.ResponseSearchSong;
import com.tide.music.response.ResponseSongInfo;
import com.tide.music.service.music.MusicService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class MusicController {

    private Environment env;
    private MusicService musicService;

    public MusicController(Environment env, MusicService musicService) {
        this.env = env;
        this.musicService = musicService;
    }

    @PostMapping("/search")
    public List<ResponseSearchSong> searchSongList(@RequestBody RequestSearchSong request) {
        return musicService.searchSongList(request.getTitle());
    }

    // 음악 상세
    @GetMapping("/song/{songId}")
    public ResponseSongInfo searchSong(@PathVariable("songId") Long songId) {
        return musicService.searchSong(songId);
    }

    @PutMapping("/like/{songId}")
    public ResponseEntity<String> likeSong(@PathVariable("songId") Long songId,
                                           @RequestHeader("email") String email) {
        musicService.likeSong(songId, email);
        return ResponseEntity.status(HttpStatus.OK).body("좋아요 처리");
    }

    // 음악 좋아요 체크
    @GetMapping("/like/{songId}")
    public boolean likeCheck(@PathVariable("songId") Long songId,
                             @RequestHeader("email") String email) {
        return musicService.likeCheck(songId, email);
    }

    // 다이어리 서비스와 통신
    @GetMapping("/getsonginfo")
    ResponseSearchSong getSongInfo(@RequestParam("songId") Long songId) {
        return musicService.getSongInfo(songId);
    }
}
