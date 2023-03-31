package com.tide.diary.jpa.diarylist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryDiaryListRepository extends JpaRepository<DiaryDiaryList, Long> {
    List<DiaryDiaryList> findAllByDiaryListId(Long diaryListId);

    DiaryDiaryList findByDiaryListIdAndDiaryId(Long diaryListId, Long diaryId);
}
