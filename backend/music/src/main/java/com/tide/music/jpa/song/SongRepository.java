package com.tide.music.jpa.song;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    @Query("SELECT s FROM Song s WHERE REPLACE(s.title, ' ', '') LIKE %:title% OR s.title LIKE %:title%")
    List<Song> findTitle(@Param("title") String title, Pageable pageable);

    Song findBySongId(Long songId);

}
