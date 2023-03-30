package com.tide.diary.controller.comment;

import com.tide.diary.request.RequestComment;
import com.tide.diary.request.RequestNickname;
import com.tide.diary.response.ResponseComment;
import com.tide.diary.service.comment.DiaryCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/")
public class DiaryCommentController {

    private DiaryCommentService diaryCommentService;

    public DiaryCommentController(DiaryCommentService diaryCommentService) {
        this.diaryCommentService = diaryCommentService;
    }

    // 댓글 작성
    @PostMapping("/comment/{diaryId}")
    public ResponseEntity<String> comment(@RequestHeader("email") String email,
                                          @PathVariable("diaryId") Long diaryId,
                                          @RequestBody RequestComment request) {
        diaryCommentService.comment(email, diaryId ,request);
        return ResponseEntity.status(HttpStatus.OK).body("Comment Created Successfully");
    }

    // 댓글 보기
    @GetMapping("/comment/{diaryId}")
    public List<ResponseComment> comments(@PathVariable("diaryId") Long diaryId) {
        return diaryCommentService.getComments(diaryId);
    }

    // 댓글 삭제
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long commentId,
                                                @RequestHeader("email") String email,
                                                @RequestBody RequestNickname request) {
        diaryCommentService.deleteComment(email, commentId, request.getNickname());
        return ResponseEntity.status(HttpStatus.OK).body("Comment Deleted");
    }
}
