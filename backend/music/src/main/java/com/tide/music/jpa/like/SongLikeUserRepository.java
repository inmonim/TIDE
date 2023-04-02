package com.tide.music.jpa.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongLikeUserRepository extends JpaRepository<SongLikeUser, Long> {
    SongLikeUser findBySongIdAndUserId(Long songId, Long userId);
}
