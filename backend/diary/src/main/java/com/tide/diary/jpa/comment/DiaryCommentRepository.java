package com.tide.diary.jpa.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryCommentRepository extends JpaRepository<DiaryComment, Long> {
    List<DiaryComment> findAllByDiaryId(Long diaryId);
    Optional<DiaryComment> findById(Long commentId);
}
