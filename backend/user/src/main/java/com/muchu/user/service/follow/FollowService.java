package com.muchu.user.service.follow;

import com.muchu.user.response.ResponseFollow;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FollowService {
    List<ResponseFollow> followUser(String email);
    List<ResponseFollow> followWait(String email);
    List<ResponseFollow> follower(String email);
    void follow(String email, String nickname);
    void acceptFollow(String email, String nickname);
    void cancelFollower(String email, String nickname);
    void cancelFollow(String email, String nickname);
}
