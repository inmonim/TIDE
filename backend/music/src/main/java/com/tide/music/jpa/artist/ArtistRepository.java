package com.tide.music.jpa.artist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    List<Artist> findAllByArtistId(Long artistId);
    Artist findByArtistId(Long artistId);
}
