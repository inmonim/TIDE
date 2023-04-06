package com.tide.music.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "api-user")
public interface UserServiceClient {

    @GetMapping("/getuserid")
    Long getUserId(@RequestHeader("email") String email);

    @GetMapping("/getid")
    Long getId(@RequestParam("nickname") String nickname);

    @GetMapping("/getnickname")
    String getNickname(@RequestParam("userId") Long userId);

    @GetMapping("/enablefollow")
    boolean enableFollow(@RequestHeader("email") String email, @RequestParam("nickname") String nickname);
}
