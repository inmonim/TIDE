package com.tide.music.service.playlist;

import com.tide.music.request.RequestPlaylist;
import com.tide.music.response.ResponsePlaylist;

import java.util.List;

public interface PlaylistService {
    void addPlaylist(String email, RequestPlaylist request);
    List<ResponsePlaylist> getMyPlaylists(String email);
}
