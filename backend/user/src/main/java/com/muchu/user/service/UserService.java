package com.muchu.user.service;

import com.muchu.user.dto.UserDto;
import com.muchu.user.jpa.user.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserDto getUserDetailsByEmail(String email);
}
