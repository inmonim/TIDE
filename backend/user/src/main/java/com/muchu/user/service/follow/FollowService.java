package com.muchu.user.service.follow;

import com.muchu.user.response.ResponseFollow;
import com.muchu.user.response.ResponseProfile;

import java.util.List;

public interface FollowService {
    List<ResponseFollow> followUser(String email);

    List<ResponseFollow> followWait(String email);

    List<ResponseFollow> follower(String email);

    void follow(String email, String nickname);

    void acceptFollow(String email, String nickname);

    void cancelFollower(String email, String nickname);

    void cancelFollow(String email, String nickname);

    void followRefuse(String email, String nickname);

    List<ResponseProfile> getUserFollowers(String nickname);

    List<ResponseProfile> getUserFollows(String nickname);
}
