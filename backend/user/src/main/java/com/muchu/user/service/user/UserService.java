package com.muchu.user.service.user;

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
    void deleteUser(String email);
    Long searchId(String email);
    List<Long> searchFollowId(String email);
    String searchNickname(Long userId);

    boolean enableFollow(String email, String nickname);
    Long getId(String nickname);
}
