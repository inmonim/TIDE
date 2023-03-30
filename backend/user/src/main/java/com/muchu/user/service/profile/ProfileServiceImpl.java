package com.muchu.user.service.profile;

import com.muchu.user.jpa.profile.Profile;
import com.muchu.user.jpa.profile.ProfileRepository;
import com.muchu.user.jpa.user.User;
import com.muchu.user.jpa.user.UserRepository;
import com.muchu.user.request.UserInfoRequest;
import com.muchu.user.response.ResponseProfile;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public ProfileServiceImpl(UserRepository userRepository,
                           ProfileRepository profileRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Transactional
    public UserInfoRequest updateInfo(UserInfoRequest request, String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        log.info("user: {}", user);
        user.setNickname(request.getNickname());
        Long userId = user.getId();
        Profile profile = profileRepository.findByUserid(userId);
        profile.setUserid(userId);
        profile.setIntroduce(request.getIntroduce());
        profile.setProfile_img_path(request.getProfile_img_path());

        UserInfoRequest userInfoRequest = mapper.map(profile, UserInfoRequest.class);
        userInfoRequest.setNickname(request.getNickname());

        return userInfoRequest;
    }

    @Transactional
    public void deleteInfo(String email) {
        User user = userRepository.findByEmail(email);
        Long deleteUserId = user.getId();
        profileRepository.deleteByUserid(deleteUserId);
    }

    @Transactional
    public ResponseProfile getUserInfo(String nickname) {
        User user = userRepository.findByNickname(nickname);
        Profile profile = profileRepository.findByUserid(user.getId());

        ResponseProfile response = new ResponseProfile();
        response.setNickname(user.getNickname());
        response.setIntroduce(profile.getIntroduce());
        response.setProfile_img_path(profile.getProfile_img_path());
        response.setGender(user.getGender());
        
        return response;
    }

    @Transactional
    public ResponseProfile infoUser(String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long userId = user.getId();
        Optional<Profile> profile = Optional.ofNullable(profileRepository.findByUserid(userId));
        ResponseProfile responseProfile = new ResponseProfile();
        responseProfile.setIntroduce(profile.get().getIntroduce());
        responseProfile.setProfile_img_path(profile.get().getProfile_img_path());
        responseProfile.setNickname(user.getNickname());
        responseProfile.setPoint(profile.get().getPoint());
        responseProfile.setGender(user.getGender());

        return responseProfile;
    }
}
