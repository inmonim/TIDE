package com.tide.diary.controller;

import com.tide.diary.request.*;
import com.tide.diary.response.ResponseComment;
import com.tide.diary.response.ResponseDiary;
import com.tide.diary.response.ResponseTopDiary;
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

    // 공개 다이어리 조회
    @GetMapping("/public")
    public List<ResponseDiary> getDiaries() {
        return diaryService.getDiaries();
    }

    // 다이어리 자세히보기
    @GetMapping("/detail/{diaryId}")
    public ResponseDiary getDiary(@PathVariable("diaryId") Long diaryId) {
        return diaryService.getDetailDiary(diaryId);
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

    // 좋아요 탑 3의 다이어리 조회
    @GetMapping("/like/top/{songId}")
    public List<ResponseTopDiary> getTop3Diaries(@PathVariable("songId") Long songId) {
        return diaryService.getTop3Diaries(songId);
    }

    // 최신순 탑 3의 다이어리 조회
    @GetMapping("/latest/top/{songId}")
    public List<ResponseTopDiary> getLatest3Diaries(@PathVariable("songId") Long songId) {
        return diaryService.getLatest3Diaries(songId);
    }

    // 특정 닉네임 기준 다이어리 조회
    @PostMapping("/user/diaries")
    public List<ResponseDiary> getUserDiaries(@RequestHeader("email") String email,
                                              @RequestBody RequestNickname request) {
        return diaryService.getUserDiaries(email, request.getNickname());
    }

    // 다이어리 작성
    @PostMapping("/write")
    public ResponseEntity<String> addDiary(@RequestHeader("email") String email,
                                           @RequestBody RequestDiary request) {
        diaryService.addDiary(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Diary Added Successfully");
    }

    // 공개여부 변경
    @PutMapping("/public/{diaryId}")
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
}

