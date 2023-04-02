package com.tide.music.jpa.playlist.song;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, Long> {
    PlaylistSong findByPlaylistIdAndSongId(Long playlistId, Long songId);
    List<PlaylistSong> findAllByPlaylistId(Long playlistId);
}
