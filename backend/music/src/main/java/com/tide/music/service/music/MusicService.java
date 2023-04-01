package com.tide.music.service.music;

import com.tide.music.response.ResponseSearchSong;

import java.util.List;

public interface MusicService {
    List<ResponseSearchSong> searchSongList(String keyword);
}
