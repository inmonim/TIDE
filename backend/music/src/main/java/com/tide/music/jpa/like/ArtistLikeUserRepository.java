package com.tide.music.jpa.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistLikeUserRepository extends JpaRepository<ArtistLikeUser, Long> {

    ArtistLikeUser findByUserIdAndLikedArtistId(Long userId, Long artistId);
}
