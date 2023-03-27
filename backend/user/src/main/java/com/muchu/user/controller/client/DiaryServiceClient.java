package com.muchu.user.controller.client;

import com.muchu.user.response.ResponseMyDiary;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "api-diary")
public interface DiaryServiceClient {

    @GetMapping("/list")
    List<ResponseMyDiary> getDiaries(@RequestHeader("email") String email);
}
