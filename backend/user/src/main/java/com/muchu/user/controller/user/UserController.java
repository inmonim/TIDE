package com.muchu.user.controller.user;

import com.muchu.user.request.UserCreateRequest;
import com.muchu.user.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@Slf4j
public class UserController {

    private Environment env;
    private UserService userSerivce;

    public UserController(Environment env, UserService userSerivce) {
        this.env = env;
        this.userSerivce = userSerivce;
    }

    @GetMapping("/jenkins_version")
    public String version() {
        return "Jenkins to running!!!!";
    }

    @PostMapping("/register")
    public UserCreateRequest createUser(@RequestBody UserCreateRequest request) {
        return userSerivce.createUser(request);
    }

    @DeleteMapping("/register")
    public ResponseEntity<String> deleteUser(@RequestHeader("email") String email) {
        userSerivce.deleteUser(email);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User Deleted");
    }

    @GetMapping("/getuserid")
    public Long getUserId(@RequestHeader("email") String email) {
        return userSerivce.searchId(email);
    }

    @GetMapping("/getfollow")
    public List<Long> getFollowId(@RequestHeader("email") String email) {
        return userSerivce.searchFollowId(email);
    }

    @GetMapping("/getnickname")
    public String getNickname(@RequestParam("userId") Long userId) {
        return userSerivce.searchNickname(userId);
    }

    @GetMapping("/enablefollow")
    public boolean enableFollow(@RequestHeader("email") String email, @RequestParam("nickname") String nickname) {
        return userSerivce.enableFollow(email, nickname);
    }

    @GetMapping("/getid")
    public Long getId(@RequestParam("nickname") String nickname) {
        return userSerivce.getId(nickname);
    }

}
