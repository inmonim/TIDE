package com.tide.diary.service;

import com.tide.diary.request.RequestDiary;
import com.tide.diary.request.RequestPub;
import com.tide.diary.response.ResponseDiary;
import com.tide.diary.response.ResponseTopDiary;

import java.util.List;

public interface DiaryService {
    List<ResponseDiary> getMyDiaries(String email);

    List<ResponseDiary> getFollowDiaries(String email);

    void addDiary(String email, RequestDiary request);

    ResponseDiary getDetailDiary(Long diaryId);

    List<ResponseDiary> getDiaries();

    void delete(String email, Long diaryId);

    void changeStatus(String email, Long diaryId, RequestPub request);

    List<ResponseDiary> getUserDiaries(String email, String nickname);

    List<ResponseTopDiary> getTop3Diaries(Long songId);
}
