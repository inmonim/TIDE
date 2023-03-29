package com.tide.diary.service;

import com.tide.diary.request.RequestDiary;
import com.tide.diary.response.ResponseDiary;

import java.util.List;

public interface DiaryService {
    List<ResponseDiary> getMyDiaries(String email);
    List<ResponseDiary> getFollowDiaries(String email);
    List<ResponseDiary> getFollowerDiaries(String email);
    void addDiary(String email, RequestDiary request);
}
