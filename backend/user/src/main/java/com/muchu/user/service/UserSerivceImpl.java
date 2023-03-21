package com.muchu.user.service;

import com.muchu.user.dto.UserDto;
import com.muchu.user.jpa.profile.Profile;
import com.muchu.user.jpa.profile.ProfileRepository;
import com.muchu.user.jpa.user.User;
import com.muchu.user.jpa.user.UserRepository;
import com.muchu.user.request.UserCreateRequest;
import com.muchu.user.request.UserInfoRequest;
import com.muchu.user.response.ResponseProfile;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserSerivceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserSerivceImpl(UserRepository userRepository, ProfileRepository profileRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Transactional
    public UserCreateRequest createUser(UserCreateRequest request) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = mapper.map(request, User.class);
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        UserCreateRequest returnUserCreateRequest = mapper.map(user, UserCreateRequest.class);

        return returnUserCreateRequest;
    }

    @Transactional
    public UserInfoRequest createInfo(UserInfoRequest request, String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long userId = user.getId();
        Profile profile = mapper.map(request, Profile.class);
        profile.setUserid(userId);
        profile.setPoint(500);

        profileRepository.save(profile);

        UserInfoRequest userInfoRequest = mapper.map(profile, UserInfoRequest.class);

        return userInfoRequest;
    }

    @Override
    public UserInfoRequest updateInfo(UserInfoRequest request, String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long userId = user.getId();
        Profile profile = profileRepository.findByUserid(userId);

        UserInfoRequest userInfoRequest = mapper.map(profile, UserInfoRequest.class);

        return userInfoRequest;
    }

    @Transactional
    public ResponseProfile infoUser(String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long userId = user.getId();
        Profile profile = profileRepository.findByUserid(userId);
        ResponseProfile responseProfile = mapper.map(profile, ResponseProfile.class);

        return responseProfile;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if(user == null) {
            throw new UsernameNotFoundException(username);
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                new ArrayList<>());
    }

    @Override
    public UserDto getUserDetailsByEmail(String email) {
        User user = userRepository.findByEmail(email);

        UserDto userDto = new ModelMapper().map(user, UserDto.class);
        return userDto;
    }
}
