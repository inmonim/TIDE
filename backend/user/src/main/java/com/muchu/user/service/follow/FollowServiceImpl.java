package com.muchu.user.service.follow;

import com.muchu.user.jpa.follow.Follow;
import com.muchu.user.jpa.follow.FollowRepository;
import com.muchu.user.jpa.profile.Profile;
import com.muchu.user.jpa.profile.ProfileRepository;
import com.muchu.user.jpa.user.User;
import com.muchu.user.jpa.user.UserRepository;
import com.muchu.user.response.ResponseFollow;
import com.muchu.user.response.ResponseProfile;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class FollowServiceImpl implements FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final ProfileRepository profileRepository;

    public FollowServiceImpl(UserRepository userRepository, FollowRepository followRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.followRepository = followRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional
    public List<ResponseFollow> followUser(String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long toUser = user.getId();

        List<Follow> followUsers = followRepository.findAllByToUserAndAccept(toUser, "1");
        List<ResponseFollow> followProfiles = new ArrayList<>();

        for (Follow follow : followUsers) {
            Optional<Profile> profileOptional = Optional.ofNullable(profileRepository.findByUserid(follow.getFromUser()));
            Optional<User> userOptional = userRepository.findById(follow.getFromUser());
            if (profileOptional == null) {
                followProfiles = new ArrayList<>();
                break;
            } else {
                ResponseFollow responseFollow = new ResponseFollow();
                responseFollow.setProfile_img_path(profileOptional.get().getProfile_img_path());
                responseFollow.setIntroduce(profileOptional.get().getIntroduce());
                responseFollow.setNickname(userOptional.get().getNickname());
                followProfiles.add(responseFollow);
            }
        }

        return followProfiles;
    }

    @Override
    @Transactional
    public List<ResponseFollow> followWait(String email) {
        ModelMapper mapper = new ModelMapper();
        User user = userRepository.findByEmail(email);
        Long FromUser = user.getId();
        log.info("toUser: {}", FromUser);

        List<Follow> followWait = followRepository.findAllByFromUserAndAccept(FromUser, "0");
        List<ResponseFollow> followWaitList = new ArrayList<>();

        for (Follow follow : followWait) {
            Optional<Profile> profileOptional = Optional.ofNullable(profileRepository.findByUserid(follow.getToUser()));
            Optional<User> userOptional = userRepository.findById(follow.getToUser());
            if (profileOptional == null) {
                followWaitList = new ArrayList<>();
                break;
            } else {
                ResponseFollow responseFollow = new ResponseFollow();
                responseFollow.setProfile_img_path(profileOptional.get().getProfile_img_path());
                responseFollow.setIntroduce(profileOptional.get().getIntroduce());
                responseFollow.setNickname(userOptional.get().getNickname());
                followWaitList.add(responseFollow);
            }
        }

        return followWaitList;
    }

    @Transactional
    public List<ResponseFollow> follower(String email) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = userRepository.findByEmail(email);
        Long toUser = user.getId();

        List<Follow> followUsers = followRepository.findAllByFromUserAndAccept(toUser, "1");
        List<ResponseFollow> followerList = new ArrayList<>();

        for (Follow follow : followUsers) {
            Optional<Profile> profileOptional = Optional.ofNullable(profileRepository.findByUserid(follow.getToUser()));
            Optional<User> userOptional = userRepository.findById(follow.getToUser());
            if (profileOptional == null) {
                followerList = new ArrayList<>();
                break;
            } else {
                ResponseFollow responseFollow = new ResponseFollow();
                responseFollow.setProfile_img_path(profileOptional.get().getProfile_img_path());
                responseFollow.setIntroduce(profileOptional.get().getIntroduce());
                responseFollow.setNickname(userOptional.get().getNickname());
                followerList.add(responseFollow);
            }
        }
        return followerList;

    }

    @Transactional
    public void follow(String email, String nickname) {
        User user = userRepository.findByEmail(email);
        Long userId = user.getId();
        Follow follow = new Follow();
        follow.setToUser(userId);
        Long fromUserId = userRepository.findByNickname(nickname).getId();
        follow.setFromUser(fromUserId);
        if (userId == fromUserId) {
            throw new IllegalArgumentException("팔로우 신청이 잘못되었습니다.");
        }
        followRepository.findByFromUserAndToUser(userId, fromUserId);
        Follow follow1 = followRepository.findByFromUserAndToUser(fromUserId, userId);
        if (follow1 != null) {
            log.info(follow1.toString());
            throw new IllegalArgumentException("신청이 이미 존재합니다.");
        }
        Follow follow2 = followRepository.findByToUserAndFromUser(fromUserId, userId);
        if (follow2 != null) {
            log.info(follow2.toString());
            throw new IllegalArgumentException("신청이 이미 존재합니다");
        }

        follow.setAccept("0");
        log.info(follow.toString());

        followRepository.save(follow);
    }

    @Override
    @Transactional
    public void acceptFollow(String email, String nickname) {
        User user = userRepository.findByEmail(email);
        Long fromUserId = user.getId();
        Long toUserId = userRepository.findByNickname(nickname).getId();
        log.info(toUserId.toString());
        log.info(fromUserId.toString());
        if (fromUserId == toUserId) {
            throw new IllegalArgumentException("팔로우 수락 신청이 잘못되었습니다.");
        }
        Follow follow = followRepository.findByFromUserAndToUser(fromUserId, toUserId);
        log.info(follow.toString());
        follow.setAccept("1");

        followRepository.save(follow);
    }

    @Override
    @Transactional
    public void cancelFollower(String email, String nickname) {
        User user = userRepository.findByEmail(email);
        Long fromUserId = user.getId();
        User toUser = userRepository.findByNickname(nickname);
        Long toUserId = toUser.getId();
        log.info("{} 유저가 팔로우한 {} 유저를 취소", toUserId.toString(), fromUserId.toString());
        Follow follow = followRepository.findByFromUserAndToUser(fromUserId, toUserId);
        followRepository.delete(follow);
    }

    @Override
    @Transactional
    public void cancelFollow(String email, String nickname) {
        User user = userRepository.findByEmail(email);
        Long toUserId = user.getId();
        User fromUser = userRepository.findByNickname(nickname);
        Long fromUserId = fromUser.getId();
        log.info("{} 유저가 보낸 팔로우를 {} 유저가 취소", toUserId.toString(), fromUserId.toString());
        Follow follow = followRepository.findByToUserAndFromUser(toUserId, fromUserId);
        followRepository.delete(follow);
    }

    @Override
    @Transactional
    public void followRefuse(String email, String nickname) {
        User user = userRepository.findByEmail(email);
        Long fromUserId = user.getId();
        User toUser = userRepository.findByNickname(nickname);
        Long toUserId = toUser.getId();
        log.info("{} 유저가 팔로우한 {} 유저를 취소", toUserId.toString(), fromUserId.toString());
        Follow follow = followRepository.findByFromUserAndToUser(fromUserId, toUserId);
        followRepository.delete(follow);
    }

    // 어떤 유저의 팔로워 보기
    @Override
    public List<ResponseProfile> getUserFollowers(String nickname) {
        User user = userRepository.findByNickname(nickname);
        Long userId = user.getId();
        List<Follow> follows = followRepository.findAllByToUserAndAccept(userId,"1");
        List<ResponseProfile> result = new ArrayList<>();
        for (Follow follow : follows) {
            ResponseProfile responseProfile = new ResponseProfile();
            Profile profile = profileRepository.findByUserid(follow.getFromUser());
            Optional<User> user1 = userRepository.findById(follow.getFromUser());
            responseProfile.setProfile_img_path(profile.getProfile_img_path());
            responseProfile.setPoint(profile.getPoint());
            responseProfile.setGender(user1.get().getGender());
            responseProfile.setIntroduce(profile.getIntroduce());
            responseProfile.setNickname(user1.get().getNickname());
            result.add(responseProfile);
        }
        
        return result;
    }

    // 어떤 유저의 팔로잉 보기
    public List<ResponseProfile> getUserFollows(String nickname) {
        User user = userRepository.findByNickname(nickname);
        Long userId = user.getId();
        List<Follow> follows = followRepository.findAllByFromUserAndAccept(userId,"1");
        List<ResponseProfile> result = new ArrayList<>();
        for (Follow follow : follows) {
            ResponseProfile responseProfile = new ResponseProfile();
            Profile profile = profileRepository.findByUserid(follow.getToUser());
            Optional<User> user1 = userRepository.findById(follow.getToUser());
            responseProfile.setProfile_img_path(profile.getProfile_img_path());
            responseProfile.setPoint(profile.getPoint());
            responseProfile.setGender(user1.get().getGender());
            responseProfile.setIntroduce(profile.getIntroduce());
            responseProfile.setNickname(user1.get().getNickname());
            result.add(responseProfile);
        }

        return result;
    }

}
