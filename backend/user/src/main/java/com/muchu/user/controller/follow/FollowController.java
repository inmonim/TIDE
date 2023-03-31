package com.muchu.user.controller.follow;

import com.muchu.user.request.UserNicknameRequest;
import com.muchu.user.response.ResponseFollow;
import com.muchu.user.response.ResponseProfile;
import com.muchu.user.service.follow.FollowService;
import com.muchu.user.service.user.UserService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class FollowController {

    private Environment env;
    private UserService userSerivce;
    private FollowService followService;

    public FollowController(Environment env, UserService userSerivce,FollowService followService) {
        this.env = env;
        this.userSerivce = userSerivce;
        this.followService = followService;
    }

    // 팔로우 신청
    @PostMapping("/follow")
    public ResponseEntity<String> follow(@RequestHeader("email") String email,
                                         @RequestBody UserNicknameRequest request) {
        followService.follow(email, request.getNickname());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 팔로우 수락대기 목록 신청
    @GetMapping("/followwait")
    public List<ResponseFollow> followWait(@RequestHeader("email") String email) {
        return followService.followWait(email);
    }

    // 팔로우 리스트 신청
    @GetMapping("/followlist")
    public List<ResponseFollow> followUser(@RequestHeader("email") String email) {
        return followService.followUser(email);
    }

    // 팔로워 리스트 신청
    @GetMapping("/follower")
    public List<ResponseFollow> follower(@RequestHeader("email") String email) {
        return followService.follower(email);
    }

    // 팔로우 수락
    @PutMapping("/follow")
    public ResponseEntity<String> acceptFollow(@RequestHeader("email") String email,
                                               @RequestBody UserNicknameRequest request) {
        followService.acceptFollow(email, request.getNickname());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/followrefuse")
    public ResponseEntity<String> followRefuse(@RequestHeader("email") String email,
                                               @RequestBody UserNicknameRequest request) {
        followService.followRefuse(email, request.getNickname());
        return ResponseEntity.status(HttpStatus.OK).body("followRefuse");
    }

    // 언팔로우
    @DeleteMapping("/follow")
    public ResponseEntity<String> cancelFollow(@RequestHeader("email") String email,
                                               @RequestBody UserNicknameRequest request) {
        followService.cancelFollow(email, request.getNickname());
        return ResponseEntity.status(HttpStatus.OK).body("언팔로우");
    }

    // 팔로워가 팔로잉 취소
    @DeleteMapping("/follower")
    public ResponseEntity<String> cancelFollower(@RequestHeader("email") String email,
                                                 @RequestBody UserNicknameRequest request) {
        followService.cancelFollower(email, request.getNickname());
        return ResponseEntity.status(HttpStatus.OK).body("팔로워가 취소");
    }

    // 다른 유저 팔로워 정보
    @PostMapping("/userfollower")
    public List<ResponseProfile> getUserFollowers(@RequestBody UserNicknameRequest request) {
        return followService.getUserFollowers(request.getNickname());
    }

    // 다른 유저 팔로우 정보
    @PostMapping("/userfollow")
    public List<ResponseProfile> getUserFollows(@RequestBody UserNicknameRequest request) {
        return followService.getUserFollows(request.getNickname());
    }
}
