package com.muchu.user.jpa.profile;

import com.muchu.user.service.profile.ProfileService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByUserid(Long userId);
    void deleteByUserid(Long userId);
}
