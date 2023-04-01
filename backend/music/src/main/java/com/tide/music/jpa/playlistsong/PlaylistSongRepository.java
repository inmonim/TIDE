package com.tide.music.jpa.playlistsong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, Long> {
    PlaylistSong findByPlaylistIdAndSongId(Long playlistId, Long songId);
}
