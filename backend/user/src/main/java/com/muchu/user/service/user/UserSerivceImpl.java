package com.muchu.user.service.user;

import com.muchu.user.dto.UserDto;
import com.muchu.user.jpa.follow.Follow;
import com.muchu.user.jpa.follow.FollowRepository;
import com.muchu.user.jpa.profile.Profile;
import com.muchu.user.jpa.profile.ProfileRepository;
import com.muchu.user.jpa.user.User;
import com.muchu.user.jpa.user.UserRepository;
import com.muchu.user.request.UserCreateRequest;
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
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ProfileRepository profileRepository;
    private final FollowRepository followRepository;

    public UserSerivceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           ProfileRepository profileRepository,
                           FollowRepository followRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.profileRepository = profileRepository;
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
        Profile profile = new Profile();
        profile.setUserid(user.getId());
        profile.setPoint(500);
        profileRepository.save(profile);

        return returnUserCreateRequest;
    }

    @Override
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email);
        userRepository.delete(user);
    }

    @Override
    public Long searchId(String email) {
        User user = userRepository.findByEmail(email);
        return user.getId();
    }

    @Override
    public List<Long> searchFollowId(String email) {
        User user = userRepository.findByEmail(email);
        Long userId = user.getId();
        List<Long> list = new ArrayList<>();
        List<Follow> follows = followRepository.findAllByToUserAndAccept(userId, "1");
        List<Follow> follower = followRepository.findAllByFromUserAndAccept(userId, "1");

        for (Follow follow : follows) {
            Long id = follow.getFromUser();
            list.add(id);
        }
        for (Follow follow : follower) {
            Long id = follow.getToUser();
            list.add(id);
        }

        return list;
    }

    @Override
    @Transactional
    public String searchNickname(Long userId) {
        log.info(userId.toString());
        return userRepository.findById(userId).get().getNickname();
    }

    @Override
    @Transactional
    public boolean enableFollow(String email, String nickname) {
        Long userId = userRepository.findByEmail(email).getId();
        Long checkId = userRepository.findByNickname(nickname).getId();
        Follow follow1 = followRepository.findByFromUserAndToUserAndAccept(userId, checkId, "1");
        if(follow1 != null) {
            return true;
        }
        Follow follow2 = followRepository.findByToUserAndFromUserAndAccept(userId, checkId, "1");
        if(follow2 != null) {
            return true;
        }

        return false;
    }

    @Override
    @Transactional
    public Long getId(String nickname) {
        User user = userRepository.findByNickname(nickname);
        return user.getId();
    }


    @Override
    @Transactional
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
