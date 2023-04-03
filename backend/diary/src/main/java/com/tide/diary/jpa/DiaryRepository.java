package com.tide.diary.jpa;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findAllByUserId(Long userId);

    List<Diary> findAllByUserIdAndPub(Long userId, String pub);

    List<Diary> findAllByPub(String s);

    List<Diary> findAllByUserIdAndPubNot(Long userId, String s);

    @Query("SELECT d FROM Diary d WHERE d.songId = :songId AND d.pub = :pub ORDER BY d.id DESC")
    List<Diary> findLatest3DiariesBySongId(@Param("songId") Long songId,@Param("pub") String pub, Pageable pageable);

    @Query("SELECT d FROM Diary d WHERE d.songId = :songId AND d.pub = :pub ORDER BY d.likeCnt DESC")
    List<Diary> findTop3DiariesBySongIdOrderByLikeCnt(@Param("songId") Long songId,@Param("pub") String pub, Pageable pageable);

}
