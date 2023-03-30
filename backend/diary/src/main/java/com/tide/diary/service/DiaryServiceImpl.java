package com.tide.diary.service;

import com.tide.diary.client.UserServiceClient;
import com.tide.diary.jpa.Diary;
import com.tide.diary.jpa.DiaryRepository;
import com.tide.diary.request.RequestDiary;
import com.tide.diary.response.ResponseDiary;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserServiceClient userServiceClient;

    public DiaryServiceImpl(DiaryRepository diaryRepository, UserServiceClient userServiceClient) {
        this.diaryRepository = diaryRepository;
        this.userServiceClient = userServiceClient;
    }

    @Transactional
    public List<ResponseDiary> getMyDiaries(String email) {
        Long userId = userServiceClient.getUserId(email);
        log.info("userId: {}", userId);
        List<Diary> diaries = diaryRepository.findAllByUserId(userId);
        List<ResponseDiary> responseMyDiaries = new ArrayList<>();

        for (Diary diary : diaries) {
            ResponseDiary response = new ResponseDiary();
            response.setId(diary.getId());
            response.setContent(diary.getContent());
            response.setLike(diary.getLikeCnt());
            response.setCreateDt(diary.getCreateDt());
            response.setPub(diary.getPub());
            response.setTitle(diary.getTitle());
            responseMyDiaries.add(response);
        }
        return responseMyDiaries;
    }

    @Override
    @Transactional
    public List<ResponseDiary> getFollowDiaries(String email) {
        Long userId = userServiceClient.getUserId(email);
        List<Long> followIds = userServiceClient.getFollowId(email);
        List<ResponseDiary> responseDiary = new ArrayList<>();

        for (Long follow : followIds) {
            List<Diary> diariesPub = diaryRepository.findAllByUserIdAndPub(follow, "0");
            List<Diary> diariesFollow = diaryRepository.findAllByUserIdAndPub(follow, "1");
            for (Diary diary : diariesPub) {
                ResponseDiary response = new ResponseDiary();
                response.setId(diary.getId());
                response.setContent(diary.getContent());
                response.setLike(diary.getLikeCnt());
                response.setCreateDt(diary.getCreateDt());
                response.setPub(diary.getPub());
                response.setTitle(diary.getTitle());
                responseDiary.add(response);
            }
            for (Diary diary : diariesFollow) {
                ResponseDiary response = new ResponseDiary();
                response.setId(diary.getId());
                response.setContent(diary.getContent());
                response.setLike(diary.getLikeCnt());
                response.setCreateDt(diary.getCreateDt());
                response.setPub(diary.getPub());
                response.setTitle(diary.getTitle());
                responseDiary.add(response);
            }
        }

        return responseDiary;
    }

    @Override
    @Transactional
    public void addDiary(String email, RequestDiary request) {
        Long userId = userServiceClient.getUserId(email);
        LocalDateTime dateTime = LocalDateTime.now();
        Diary diary = new Diary();

        diary.setUserId(userId);
        diary.setTitle(request.getTitle());
        diary.setContent(request.getContent());
        diary.setPub(request.getPub());
        diary.setCreateDt(String.valueOf(dateTime.toLocalDate()));

        // Content를 파이썬으로 보내는 코드 작성해야함

        diaryRepository.save(diary);
    }

    @Override
    @Transactional
    public Diary getDiary(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        return diary;
    }

    @Override
    @Transactional
    public void cntLike(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        diary.setLikeCnt(diary.getLikeCnt() + 1);
        diaryRepository.save(diary);
    }

    @Override
    public List<ResponseDiary> getDiaries() {
        List<Diary> diaries = diaryRepository.findAllByPub("0");
        ModelMapper mapper = new ModelMapper();
        List<ResponseDiary> diaryList = new ArrayList<>();

        for (Diary diary : diaries) {
            ResponseDiary response = mapper.map(diary, ResponseDiary.class);
            diaryList.add(response);
        }

        return diaryList;
    }
}
