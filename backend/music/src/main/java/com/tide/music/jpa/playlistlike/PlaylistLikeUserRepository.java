package com.tide.music.jpa.playlistlike;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistLikeUserRepository extends JpaRepository<PlaylistLikeUser, Long> {
    PlaylistLikeUser findByUserIdAndPlaylistId(Long userId, Long playlistId);
}
