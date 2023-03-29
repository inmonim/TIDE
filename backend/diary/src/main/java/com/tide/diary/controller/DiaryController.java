package com.tide.diary.controller;

import com.tide.diary.request.RequestDiary;
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

    @GetMapping("/mine")
    public List<ResponseDiary> getMyDiaries(@RequestHeader("email") String email) {
        return diaryService.getMyDiaries(email);
    }

    // 팔로우 다이어리 조회
    @GetMapping("/follow")
    public List<ResponseDiary> getFollowDiaries(@RequestHeader("email")String email) {
        return diaryService.getFollowDiaries(email);
    }

    // 팔로워 다이어리 조회
    @GetMapping("/follower")
    public List<ResponseDiary> getFollowerDiaries(@RequestHeader("email")String email) {
        return diaryService.getFollowerDiaries(email);
    }

    // 다이어리 작성
    @PostMapping("/write")
    public ResponseEntity<String> addDiary(@RequestHeader("email")String email, @RequestBody RequestDiary request) {
         diaryService.addDiary(email, request);
         return ResponseEntity.status(HttpStatus.CREATED).body("Diary Added Successfully");
    }
}

