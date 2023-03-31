package com.tide.diary.jpa.list;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryListRepository extends JpaRepository<DiaryList, Long> {
    List<DiaryList> findAllByUserId(Long userId);
    DiaryList findByDiaryListTitle(String request);
}
