package com.muchu.user.service;

import com.muchu.user.dto.UserDto;
import com.muchu.user.jpa.follow.Follow;
import com.muchu.user.jpa.follow.FollowRepository;
import com.muchu.user.jpa.profile.Profile;
import com.muchu.user.jpa.profile.ProfileRepository;
import com.muchu.user.jpa.user.User;
import com.muchu.user.jpa.user.UserRepository;
import com.muchu.user.request.UserCreateRequest;
import com.muchu.user.request.UserInfoRequest;
import com.muchu.user.response.ResponseProfile;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class UserSerivceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FollowRepository followRepository;

    public UserSerivceImpl(UserRepository userRepository,
                           ProfileRepository profileRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           FollowRepository followRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.followRepository = followRepository;
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

    @Override
    public UserInfoRequest deleteInfo(String email) {
        User user = userRepository.findByEmail(email);
        userRepository.delete(user);
        return null;
    }

    @Transactional
    public List<ResponseProfile> followUser(String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long toUser = user.getId();

        List<Follow> followUsers = followRepository.findAllByToUserAndAccept(toUser,"1");
        List<ResponseProfile> responseFollowUserList = new ArrayList<>();

        for (Follow follow : followUsers) {
            Profile profile = profileRepository.findByUserid(follow.getFromUser());
            ResponseProfile responseProfile = mapper.map(profile, ResponseProfile.class);
            responseFollowUserList.add(responseProfile);
        }

        return responseFollowUserList;
    }

    @Override
    @Transactional
    public List<ResponseProfile> followWait(String email) {
        ModelMapper mapper = new ModelMapper();
        User user = userRepository.findByEmail(email);
        Long toUser = user.getId();

        List<Follow> followWait = followRepository.findAllByToUserAndAccept(toUser, "0");
        List<ResponseProfile> followWaitList = new ArrayList<>();

        for (Follow follow : followWait) {
            Profile profile = profileRepository.findByUserid(follow.getFromUser());
            ResponseProfile responseProfile = mapper.map(profile, ResponseProfile.class);
            followWaitList.add(responseProfile);
        }

        return followWaitList;
    }

    @Transactional
    public List<ResponseProfile> follower(String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long fromUser = user.getId();

        List<Follow> followUsers = followRepository.findAllByFromUserAndAccept(fromUser,"1");
        List<ResponseProfile> responseFollowerList = new ArrayList<>();

        for (Follow follow : followUsers) {
            Profile profile = profileRepository.findByUserid(follow.getToUser());

            ResponseProfile responseProfile = mapper.map(profile, ResponseProfile.class);
            responseFollowerList.add(responseProfile);
        }

        return responseFollowerList;
    }

    @Transactional
    public void follow(String email,String nickname) {
        User user = userRepository.findByEmail(email);
        Long userId = user.getId();
        Follow follow = new Follow();
        follow.setToUser(userId);
        log.info("신청 닉네임 ==================>",  nickname);
        Long fromUserId = userRepository.findByNickname(nickname).getId();
        follow.setFromUser(fromUserId);
        follow.setAccept("0");

        followRepository.save(follow);
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

        if (user == null) {
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
