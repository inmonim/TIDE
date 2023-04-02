package com.tide.music.jpa.userplaylist;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPlaylistRepository extends JpaRepository<UserPlaylist, Long> {

    List<UserPlaylist> findAllByUserId(Long userId);

    List<UserPlaylist> findAllByUserIdAndIsPublic(Long userId, String s);

    List<UserPlaylist> findAllByUserIdAndIsPublicNot(Long userId, String s);

    @Query("SELECT p FROM UserPlaylist p ORDER BY p.likeCnt DESC")
    List<UserPlaylist> findTopPlaylist(Pageable pageable);
}
