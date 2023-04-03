package com.tide.diary.service.like;

public interface DiaryLikeService {
    void cntLike(String email, Long diaryId);

    boolean likeCheck(Long diaryId, String email);
}
