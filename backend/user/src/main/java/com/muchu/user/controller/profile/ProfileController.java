package com.muchu.user.controller.profile;

import com.muchu.user.request.UserInfoRequest;
import com.muchu.user.request.UserNicknameRequest;
import com.muchu.user.response.ResponseProfile;
import com.muchu.user.service.profile.ProfileService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class ProfileController {

    private Environment env;
    private ProfileService profileService;

    public ProfileController(Environment env, ProfileService profileService) {
        this.env = env;
        this.profileService = profileService;
    }

    @PutMapping("/info")
    public UserInfoRequest updateInfo(@RequestBody UserInfoRequest request,
                                      @RequestHeader("email") String email) {
        return profileService.updateInfo(request, email);
    }

    @GetMapping("/info")
    public ResponseProfile infoUser(@RequestHeader("email") String email) {
        return profileService.infoUser(email);
    }

    @DeleteMapping("/info")
    public ResponseEntity<String> deleteInfo(@RequestHeader("email") String email) {
        profileService.deleteInfo(email);
        return ResponseEntity.status(HttpStatus.OK).body("User profile deleted");
    }
    @PostMapping("/userinfo")
    public ResponseProfile getUserInfo(@RequestBody UserNicknameRequest request) {
        return profileService.getUserInfo(request.getNickname());
    }
}
