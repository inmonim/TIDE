package com.tide.music.jpa.album;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    Album findByAlbumId(Long albumId);
}
