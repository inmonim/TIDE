package com.tide.music.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "api-user")
public interface UserServiceClient {

    @GetMapping("/getuserid")
    Long getUserId(@RequestHeader("email") String email);
}
