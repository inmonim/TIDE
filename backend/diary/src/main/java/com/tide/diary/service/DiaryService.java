package com.tide.diary.service;

import com.tide.diary.jpa.Diary;
import com.tide.diary.request.RequestDiary;
import com.tide.diary.response.ResponseDiary;

import java.util.List;

public interface DiaryService {
    List<ResponseDiary> getMyDiaries(String email);
    List<ResponseDiary> getFollowDiaries(String email);
    void addDiary(String email, RequestDiary request);
    Diary getDiary(Long diaryId);
    void cntLike(Long diaryId);
    List<ResponseDiary> getDiaries();
}
