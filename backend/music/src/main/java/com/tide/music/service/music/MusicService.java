package com.tide.music.service.music;

import com.tide.music.response.ResponseSearchSong;
import com.tide.music.response.ResponseSongInfo;

import java.util.List;

public interface MusicService {
    List<ResponseSearchSong> searchSongList(String keyword);

    ResponseSongInfo searchSong(Long songId);

    void likeSong(Long songId, String email);

    boolean likeCheck(Long songId, String email);

    ResponseSearchSong getSongInfo(Long songId);
}
