package com.muchu.user.controller;

import com.muchu.user.request.UserCreateRequest;
import com.muchu.user.service.UserSerivceImpl;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class UserController {

    private Environment env;
    private UserSerivceImpl userSerivceImpl;

    public UserController(Environment env, UserSerivceImpl userSerivceImpl) {
        this.env = env;
        this.userSerivceImpl = userSerivceImpl;
    }

    @GetMapping("/health_check")
    public String status() {
        return String.format("It's Working in User Service on PORT %s", env.getProperty("local.server.port"));
    }

    @PostMapping("/api/user/register")
    public UserCreateRequest createUser(@RequestBody UserCreateRequest request) {
        return userSerivceImpl.createUser(request);
    }

}
