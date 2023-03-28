package com.tide.diary.controller;

import com.tide.diary.response.ResponseDiary;
import com.tide.diary.service.DiaryService;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/mydiaries")
    public List<ResponseDiary> getMyDiaries(@RequestHeader("email") String email) {
        return diaryService.getMyDiaries(email);
    }

    @GetMapping("/followdiaries")
    public List<ResponseDiary> getFollowDiaries(@RequestHeader("email")String email) {
        return diaryService.getFollowDiaries(email);
    }

    @GetMapping("/connect_check")
    public String connectCheck() {
        return "Connected";
    }
}

