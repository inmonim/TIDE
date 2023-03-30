package com.tide.diary.controller.like;

import com.tide.diary.service.like.DiaryLikeService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class DiaryLikeController {

    private Environment env;
    private DiaryLikeService diaryLikeService;

    public DiaryLikeController(Environment env, DiaryLikeService diaryLikeService) {
        this.env = env;
        this.diaryLikeService = diaryLikeService;
    }
    // like + 1
    @PutMapping("/like/{diaryId}")
    public ResponseEntity<String> cntLike(@RequestHeader("email")String email,
                                          @PathVariable("diaryId") Long diaryId) {
        diaryLikeService.cntLike(email, diaryId);
        return ResponseEntity.status(HttpStatus.OK).body("좋아요 + 1");
    }
}
