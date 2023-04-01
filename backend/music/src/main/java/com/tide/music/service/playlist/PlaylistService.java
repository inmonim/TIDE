package com.tide.music.service.playlist;

import com.tide.music.request.RequestPlaylist;
import com.tide.music.request.RequestPlaylistId;
import com.tide.music.request.RequestPlaylistInfo;
import com.tide.music.response.ResponsePlaylist;

import java.util.List;

public interface PlaylistService {
    void addPlaylist(String email, RequestPlaylist request);

    List<ResponsePlaylist> getMyPlaylists(String email);

    void addSongToPlaylist(String email, Long songId, Long playlistId);

    void deleteSongFromPlaylist(String email, Long songId, Long playlistId);

    void updateSongInPlaylist(String email, RequestPlaylistInfo request);

    void likePlaylist(String email, Long playlistId);

    void deletePlaylist(String email, Long playlistId);

    List<ResponsePlaylist> getPlaylists(String email, String nickname);
}