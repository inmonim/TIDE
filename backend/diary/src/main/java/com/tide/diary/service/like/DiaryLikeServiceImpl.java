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
        DiaryLikeUser diaryLikeUser = new DiaryLikeUser();
        DiaryLikeUser check = diaryLikeUserRepository.findByDiaryIdAndUserId(diaryId, userId);
        if (check != null) {
            log.info("좋아요 취소");
            diary.setLikeCnt(diary.getLikeCnt() - 1);
            diaryLikeUserRepository.delete(check);
            diaryRepository.save(diary);
        } else {
            log.info("좋아요");
            diary.setLikeCnt(diary.getLikeCnt() + 1);
            diaryLikeUser.setDiaryId(diaryId);
            diaryLikeUser.setUserId(userId);
            diaryLikeUserRepository.save(diaryLikeUser);
            diaryRepository.save(diary);
        }
    }

    @Override
    @Transactional
    public boolean likeCheck(Long diaryId, String email) {
        Long userId = userServiceClient.getUserId(email);
        DiaryLikeUser diaryLikeUser = diaryLikeUserRepository.findByDiaryIdAndUserId(diaryId, userId);
        if(diaryLikeUser != null) {
            return true;
        }
        return false;
    }
}
