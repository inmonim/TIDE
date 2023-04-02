package com.tide.music.jpa.song.artist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongArtistRepository extends JpaRepository<SongArtist, Long> {
    List<SongArtist> findAllBySongId(Long songId);
    List<SongArtist> findByArtistId(Long artistId);
}
