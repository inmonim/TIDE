package com.tide.music.controller.playlist;

import com.tide.music.request.RequestNickname;
import com.tide.music.request.RequestPlaylist;
import com.tide.music.request.RequestPlaylistId;
import com.tide.music.request.RequestPlaylistInfo;
import com.tide.music.response.ResponseListSong;
import com.tide.music.response.ResponsePlaylist;
import com.tide.music.response.ResponseSearchSong;
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

    // 플레이리스트 추가
    @PostMapping("/playlist")
    public ResponseEntity<String> addPlaylist(@RequestHeader("email") String email,
                                              @RequestBody RequestPlaylist request) {
        playListService.addPlaylist(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("플레이리스트 저장 성공");
    }

    // 플레이리스트에 노래 추가
    @PostMapping("/playlist/{songId}")
    public ResponseEntity<String> addSongToPlaylist(@RequestHeader("email") String email,
                                                    @PathVariable("songId") Long songId,
                                                    @RequestBody RequestPlaylistId request) {
        playListService.addSongToPlaylist(email, songId, request.getPlaylistId());
        return ResponseEntity.status(HttpStatus.CREATED).body("플레이리스트에 노래 추가 성공");
    }

    // 타인의 플레이리스트 조회
    @PostMapping("/playlist/user")
    public List<ResponsePlaylist> getPlaylists(@RequestHeader("email") String email,
                                               @RequestBody RequestNickname request) {
        return playListService.getPlaylists(email, request.getNickname());
    }

    // 본인의 플레이리스트 조회
    @GetMapping("/myplaylist")
    public List<ResponsePlaylist> getMyPlaylists(@RequestHeader("email") String email) {
        return playListService.getMyPlaylists(email);
    }

    // 플레이리스트 상세 조회
    @GetMapping("/playlist/{playlistId}")
    public List<ResponseListSong> getPlaylistInfo(@RequestHeader("email") String email,
                                                  @PathVariable("playlistId") Long playlistId) {
        return playListService.getPlaylistInfo(email, playlistId);
    }

    // 좋아요 상위 플레이리스트 6개
    @GetMapping("/playlist/top")
    public List<ResponsePlaylist> getTopPlaylists() {
        return playListService.getTopPlaylists();
    }

    // 플레이리스트 좋아요 체크
    @GetMapping("/playlist/like/{playlistId}")
    public boolean getLikedPlaylists(@PathVariable("playlistId") Long playlistId,
                                                    @RequestHeader("email") String email) {
        return playListService.getLikedPlaylists(email, playlistId);
    }

    // 플레이리스트 수정 (공개여부, 플레이리스트 이름)
    @PutMapping("/playlist")
    public ResponseEntity<String> updateSongInPlaylist(@RequestHeader("email") String email,
                                                        @RequestBody RequestPlaylistInfo request) {
        playListService.updateSongInPlaylist(email, request);
        return ResponseEntity.status(HttpStatus.OK).body("플레이리스트 수정 완료");
    }

    // 플레이리스트 좋아요
    @PutMapping("/playlist/like/{playlistId}")
    public ResponseEntity<String> likePlaylist(@RequestHeader("email") String email,
                                               @PathVariable Long playlistId) {
        playListService.likePlaylist(email, playlistId);
        return ResponseEntity.status(HttpStatus.OK).body("플레이리스트 좋아요 처리");
    }

    // 플레이리스트에 있는 노래 삭제
    @DeleteMapping("/playlist/song/{songId}")
    public ResponseEntity<String> deleteSongFromPlaylist(@RequestHeader("email") String email,
                                                        @PathVariable("songId") Long songId,
                                                        @RequestBody RequestPlaylistId request) {
        playListService.deleteSongFromPlaylist(email, songId, request.getPlaylistId());
        return ResponseEntity.status(HttpStatus.OK).body("플레이리스트에 노래 삭제완료");
    }

    // 플레이리스트 삭제
    @DeleteMapping("/playlist/{playlistId}")
    public ResponseEntity<String> deletePlaylist(@RequestHeader("email") String email,
                                                 @PathVariable Long playlistId) {
        playListService.deletePlaylist(email, playlistId);
        return ResponseEntity.status(HttpStatus.OK).body("플레이리스트 삭제");
    }
}
