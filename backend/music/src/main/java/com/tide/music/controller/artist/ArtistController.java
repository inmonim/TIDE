package com.tide.music.controller.artist;

import com.tide.music.response.ResponseArtistInfo;
import com.tide.music.response.ResponseArtistList;
import com.tide.music.service.artist.ArtistService;
import feign.Response;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ArtistController {

    private Environment env;
    private ArtistService artistService;

    public ArtistController(Environment env, ArtistService artistService) {
        this.env = env;
        this.artistService = artistService;
    }

    @GetMapping("/artist/{artistId}")
    public ResponseArtistInfo getArtistInfo(@PathVariable("artistId") Long artistId) {
        return artistService.getArtistInfo(artistId);
    }

    @GetMapping("/artist/top")
    public List<ResponseArtistList> getArtistTopList() {
        return artistService.getArtistTopList();
    }

    @GetMapping("/like/artist/{artistId}")
    public boolean likeCheck(@PathVariable("artistId") Long artistId,
                             @RequestHeader("email") String email){
        return artistService.likeCheck(artistId, email);
    }

    @PutMapping("/like/artist/{artistId}")
    public ResponseEntity<String> likeArtist(@RequestHeader("email") String email,
                                             @PathVariable("artistId") Long artistId) {
        artistService.likeArtist(email, artistId);
        return ResponseEntity.status(HttpStatus.OK).body("좋아요 처리");
    }
}
