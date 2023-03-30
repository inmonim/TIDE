package com.tide.diary.service.comment;

import com.tide.diary.request.RequestComment;
import com.tide.diary.response.ResponseComment;

import java.util.List;

public interface DiaryCommentService {
    void comment(String email, Long diaryId, RequestComment request);

    List<ResponseComment> getComments(Long diaryId);

    void deleteComment(String email, Long commentId, String nickname);
}
