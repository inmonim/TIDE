package com.tide.music.jpa.lyrics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LyricsRepository extends JpaRepository<Lyrics, Long> {
    Lyrics findBySongId(Long songId);
}
