package com.muchu.user.service;

import com.muchu.user.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserDto getUserDetailsByEmail(String email);
}
