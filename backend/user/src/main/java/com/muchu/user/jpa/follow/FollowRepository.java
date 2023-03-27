package com.muchu.user.jpa.follow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findAllByToUserAndAccept(Long toUser, String accept);
    List<Follow> findAllByFromUserAndAccept(Long fromUser, String accept);

}
