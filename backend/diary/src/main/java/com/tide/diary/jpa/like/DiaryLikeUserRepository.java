package com.tide.diary.jpa.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryLikeUserRepository extends JpaRepository<DiaryLikeUser, Long> {
    DiaryLikeUser findByDiaryIdAndUserId(Long diaryId, Long userId);
}
