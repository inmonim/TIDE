package com.tide.diary.controller;

import com.tide.diary.request.RequestComment;
import com.tide.diary.request.RequestDiary;
import com.tide.diary.request.RequestNickname;
import com.tide.diary.request.RequestPub;
import com.tide.diary.response.ResponseComment;
import com.tide.diary.response.ResponseDiary;
import com.tide.diary.service.DiaryService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class DiaryController {

    private Environment env;
    private DiaryService diaryService;

    public DiaryController(Environment env, DiaryService diaryService) {
        this.env = env;
        this.diaryService = diaryService;
    }

    @GetMapping("/health_check")
    public String status() {
        return String.format("It's Working in User Service on PORT %s", env.getProperty("local.server.port"));
    }

    @GetMapping("/public")
    public List<ResponseDiary> getDiaries() {
        return diaryService.getDiaries();
    }

    // 다이어리 자세히보기
    @GetMapping("/detail/{diaryId}")
    public ResponseDiary getDiary(@PathVariable("diaryId") Long diaryId) {
        return diaryService.getDiary(diaryId);
    }

    // like + 1
    @PutMapping("/like/{diaryId}")
    public ResponseEntity<String> cntLike(@RequestHeader("email")String email,
                                          @PathVariable("diaryId") Long diaryId) {
        diaryService.cntLike(email, diaryId);
        return ResponseEntity.status(HttpStatus.OK).body("좋아요 + 1");
    }

    // 자신이 쓴 다이어리리스트  확인
    @GetMapping("/mine")
    public List<ResponseDiary> getMyDiaries(@RequestHeader("email") String email) {
        return diaryService.getMyDiaries(email);
    }

    // 팔로우 다이어리 조회
    @GetMapping("/follow")
    public List<ResponseDiary> getFollowDiaries(@RequestHeader("email") String email) {
        return diaryService.getFollowDiaries(email);
    }

    // 다이어리 작성
    @PostMapping("/write")
    public ResponseEntity<String> addDiary(@RequestHeader("email") String email, @RequestBody RequestDiary request) {
        diaryService.addDiary(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Diary Added Successfully");
    }

    // 공개여부 변경
    @PutMapping("/pub/{diaryId}")
    public ResponseEntity<String> changeStatus(@RequestHeader("email") String email,
                                               @PathVariable("diaryId") Long diaryId,
                                               @RequestBody RequestPub request) {
        diaryService.changeStatus(email, diaryId, request);
        return ResponseEntity.status(HttpStatus.OK).body("공개여부 변경 완료");
    }

    // 다이어리 삭제
    @DeleteMapping("/delete/{diaryId}")
    public ResponseEntity<String> deleteDiary(@RequestHeader("email") String email,
                                              @PathVariable("diaryId") Long diaryId) {
        diaryService.delete(email, diaryId);
        return ResponseEntity.status(HttpStatus.OK).body("Diary Deleted Successfully");
    }

    @PostMapping("/comment/{diaryId}")
    public ResponseEntity<String> comment(@RequestHeader("email") String email,
                                          @PathVariable("diaryId") Long diaryId,
                                          @RequestBody RequestComment request) {
        diaryService.comment(email, diaryId ,request);
        return ResponseEntity.status(HttpStatus.OK).body("Comment Created Successfully");
    }

    @GetMapping("/comment/{diaryId}")
    public List<ResponseComment> comments(@PathVariable("diaryId") Long diaryId) {
        return diaryService.getComments(diaryId);
    }

//    @DeleteMapping("/comment/{commentId}")
//    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long commentId,
//                                                @RequestHeader("email") String email,
//                                                @RequestBody RequestNickname request) {
//        diaryService.deleteComment(email, commentId, request.getNickname());
//        return ResponseEntity.status(HttpStatus.OK).body("Comment Deleted");
//    }
}

