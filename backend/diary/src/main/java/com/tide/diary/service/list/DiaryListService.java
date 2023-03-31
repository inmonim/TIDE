package com.tide.diary.service.list;

import com.tide.diary.jpa.list.DiaryList;
import com.tide.diary.request.RequestDeleteDiaryList;
import com.tide.diary.request.RequestListTitle;
import com.tide.diary.response.ResponseDiary;

import java.util.List;

public interface DiaryListService {
    void addList(String email, RequestListTitle request);

    List<DiaryList> getMyDiaryList(String email);

    void diaryAdd(String email, Long diaryId, RequestListTitle request);

    List<ResponseDiary> getListDiary(String email, Long diaryListId);

    void deleteListDiary(String email, RequestDeleteDiaryList request);

    void updateListDiary(String email, Long diaryListId, String diaryListTitle);

    void deleteList(String email, Long diaryListId);
}
