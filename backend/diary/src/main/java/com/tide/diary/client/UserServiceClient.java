package com.tide.diary.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "api-user")
public interface UserServiceClient {
    @GetMapping("/getuserid")
    Long getUserId(@RequestHeader("email") String email);

    @GetMapping("/getfollowid")
    List<Long> getFollowId(@RequestHeader("email") String email);

    @GetMapping("/getfollower")
    List<Long> getFollowerId(@RequestHeader("email") String email);

}
