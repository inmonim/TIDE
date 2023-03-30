package com.tide.diary.jpa.list;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryListRepository extends JpaRepository<DiaryList, Long> {
}
