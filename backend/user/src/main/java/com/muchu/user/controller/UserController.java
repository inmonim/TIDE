package com.muchu.user.controller;

import com.muchu.user.request.UserCreateRequest;
import com.muchu.user.request.UserInfoRequest;
import com.muchu.user.response.ResponseProfile;
import com.muchu.user.service.UserService;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/info")
    public UserInfoRequest createInfo(@RequestBody UserInfoRequest reqeust,
                                      @RequestHeader("email") String email) {
        return userSerivce.createInfo(reqeust, email);
    }

    @PutMapping("/info")
    public UserInfoRequest updateInfo(@RequestBody UserInfoRequest request,
                                      @RequestHeader("email") String email) {
        return userSerivce.updateInfo(request, email);
    }

    @GetMapping("/info")
    public ResponseProfile infoUser(@RequestHeader("email") String email) {
        return userSerivce.infoUser(email);
    }

}
