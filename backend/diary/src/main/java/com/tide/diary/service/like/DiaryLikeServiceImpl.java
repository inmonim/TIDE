package com.tide.diary.service.like;

import com.tide.diary.client.UserServiceClient;
import com.tide.diary.jpa.Diary;
import com.tide.diary.jpa.DiaryRepository;
import com.tide.diary.jpa.like.DiaryLikeUser;
import com.tide.diary.jpa.like.DiaryLikeUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
public class DiaryLikeServiceImpl implements DiaryLikeService {

    private UserServiceClient userServiceClient;
    private DiaryRepository diaryRepository;
    private DiaryLikeUserRepository diaryLikeUserRepository;

    public DiaryLikeServiceImpl(UserServiceClient userServiceClient, DiaryRepository diaryRepository, DiaryLikeUserRepository diaryLikeUserRepository) {
        this.userServiceClient = userServiceClient;
        this.diaryRepository = diaryRepository;
        this.diaryLikeUserRepository = diaryLikeUserRepository;
    }

    @Transactional
    public void cntLike(String email, Long diaryId) {
        Long userId = userServiceClient.getUserId(email);
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        diary.setLikeCnt(diary.getLikeCnt() + 1);
        DiaryLikeUser diaryLikeUser = new DiaryLikeUser();
        DiaryLikeUser check = diaryLikeUserRepository.findByDiaryIdAndUserId(diaryId, userId);
        if (check != null) {
            throw new IllegalStateException("이미 좋아요한 게시글입니다.");
        }
        diaryLikeUser.setDiaryId(diaryId);
        diaryLikeUser.setUserId(userId);
        diaryLikeUserRepository.save(diaryLikeUser);
        diaryRepository.save(diary);
    }
}
