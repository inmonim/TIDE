package com.muchu.user.jpa.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByNickname(String nickname);
    Optional<User> findById(Long id);
}
