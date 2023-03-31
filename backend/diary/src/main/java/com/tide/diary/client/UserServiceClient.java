package com.tide.diary.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "api-user")
public interface UserServiceClient {
    @GetMapping("/getuserid")
    Long getUserId(@RequestHeader("email") String email);
    @GetMapping("/getid")
    Long getId(@RequestParam("nickname") String nickname);

    @GetMapping("/getfollow")
    List<Long> getFollowId(@RequestHeader("email") String email);

    @GetMapping("/getnickname")
    String getNickname(@RequestParam("userId") Long userId);

    @GetMapping("/enablefollow")
    boolean enableFollow(@RequestHeader("email") String email, @RequestParam("nickname") String nickname);
}
