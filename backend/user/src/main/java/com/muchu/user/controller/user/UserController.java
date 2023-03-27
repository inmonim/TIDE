package com.muchu.user.controller.user;

import com.muchu.user.request.UserCreateRequest;
import com.muchu.user.request.UserInfoRequest;
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
public class UserController {

    private Environment env;
    private UserService userSerivce;

    public UserController(Environment env, UserService userSerivce) {
        this.env = env;
        this.userSerivce = userSerivce;
    }

    @GetMapping("/health_check")
    public String status() {
        return String.format("It's Working in User Service on PORT %s", env.getProperty("local.server.port"));
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

    @GetMapping("/diaryid")
    public Long diaryId(@RequestHeader("email") String email) {
        return userSerivce.searchId(email);
    }

}
