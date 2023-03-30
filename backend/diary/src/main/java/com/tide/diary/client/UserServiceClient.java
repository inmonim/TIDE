package com.tide.diary.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "api-user")
public interface UserServiceClient {
    @GetMapping("/getuserid")
    Long getUserId(@RequestHeader("email") String email);
    @GetMapping("/getfollow")
    List<Long> getFollowId(@RequestHeader("email") String email);
    @GetMapping("/getnickname")
    String getNickname(@RequestParam("userId") Long userId);
}
