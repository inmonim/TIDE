package com.tide.music.jpa.song.album;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongAlbumRepository extends JpaRepository<SongAlbum, Long> {
    SongAlbum findBySongId(Long id);
}
