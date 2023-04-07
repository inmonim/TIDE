package com.muchu.user.service;

import com.muchu.user.dto.UserDto;
import com.muchu.user.request.UserCreateRequest;
import com.muchu.user.request.UserInfoRequest;
import com.muchu.user.response.ResponseProfile;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserDto getUserDetailsByEmail(String email);
    UserCreateRequest createUser(UserCreateRequest request);
    ResponseProfile infoUser(String email);
    UserInfoRequest createInfo(UserInfoRequest reqeust, String email);
    UserInfoRequest updateInfo(UserInfoRequest request, String email);
    UserInfoRequest deleteInfo(String email);
    List<ResponseProfile> followUser(String email);
    List<ResponseProfile> followWait(String email);
    List<ResponseProfile> follower(String email);
    void follow(String email,String nickname);
}
