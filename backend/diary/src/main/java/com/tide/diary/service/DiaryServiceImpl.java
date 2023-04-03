package com.tide.diary.service;

import com.tide.diary.client.UserServiceClient;
import com.tide.diary.jpa.Diary;
import com.tide.diary.jpa.DiaryRepository;
import com.tide.diary.jpa.comment.DiaryCommentRepository;
import com.tide.diary.jpa.like.DiaryLikeUser;
import com.tide.diary.jpa.like.DiaryLikeUserRepository;
import com.tide.diary.request.RequestDiary;
import com.tide.diary.request.RequestPub;
import com.tide.diary.response.ResponseDiary;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final DiaryLikeUserRepository diaryLikeUserRepository;
    private final DiaryCommentRepository diaryCommentRepository;
    private final UserServiceClient userServiceClient;

    public DiaryServiceImpl(DiaryRepository diaryRepository,
                            DiaryLikeUserRepository diaryLikeUserRepository,
                            DiaryCommentRepository diaryCommentRepository,
                            UserServiceClient userServiceClient) {
        this.diaryRepository = diaryRepository;
        this.diaryLikeUserRepository = diaryLikeUserRepository;
        this.diaryCommentRepository = diaryCommentRepository;
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
            response.setNickname(userServiceClient.getNickname(diary.getUserId()));
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
                response.setNickname(userServiceClient.getNickname(diary.getUserId()));
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
                response.setNickname(userServiceClient.getNickname(diary.getUserId()));
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
        // 1. Header생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("content-type", "application/json");

        // 2. Body생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("content", request.getContent());

        // 3. HttpEntity생성
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate
                .exchange("http://127.0.0.1:4000/api", HttpMethod.POST, entity, String.class);

        log.info("flask 통신 결과 ==========>", response);

        diaryRepository.save(diary);
    }

    @Override
    @Transactional
    public ResponseDiary getDetailDiary(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        ModelMapper mapper = new ModelMapper();

        ResponseDiary response = mapper.map(diary, ResponseDiary.class);
        log.info("diary: ------------------>", diary.toString());
        response.setNickname(userServiceClient.getNickname(diary.getUserId()));
        return response;
    }

    @Override
    @Transactional
    public List<ResponseDiary> getDiaries() {
        List<Diary> diaries = diaryRepository.findAllByPub("0");
        ModelMapper mapper = new ModelMapper();
        List<ResponseDiary> diaryList = new ArrayList<>();

        for (Diary diary : diaries) {
            ResponseDiary response = mapper.map(diary, ResponseDiary.class);
            response.setNickname(userServiceClient.getNickname(diary.getUserId()));
            diaryList.add(response);
        }
        return diaryList;
    }

    @Override
    @Transactional
    public void delete(String email, Long diaryId) {
        Long userId = userServiceClient.getUserId(email);
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        if (userId != diary.getUserId()) {
            throw new IllegalStateException("작성자가 아닙니다.");
        }
        diaryRepository.delete(diary);
    }

    @Transactional
    public void changeStatus(String email, Long diaryId, RequestPub request) {
        Long userId = userServiceClient.getUserId(email);
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        if (userId != diary.getUserId()) {
            throw new IllegalStateException("작성자가 아닙니다.");
        }
        diary.setPub(request.getPub());
        diaryRepository.save(diary);
    }

    @Override
    @Transactional
    public List<ResponseDiary> getUserDiaries(String email, String nickname) {
        boolean check = userServiceClient.enableFollow(email, nickname);
        Long userId = userServiceClient.getId(nickname);
        ModelMapper mapper = new ModelMapper();
        List<ResponseDiary> response = new ArrayList<>();
        log.info(userId.toString(), check);
        if(check) {
            List<Diary> diaries = diaryRepository.findAllByUserIdAndPubNot(userId,"2");
            for (Diary diary : diaries) {
                ResponseDiary responseDiary = mapper.map(diary, ResponseDiary.class);
                responseDiary.setNickname(nickname);
                response.add(responseDiary);
            }
        } else {
            List<Diary> followDiaries = diaryRepository.findAllByUserIdAndPub(userId, "0");
            for (Diary diary : followDiaries) {
                ResponseDiary responseDiary = mapper.map(diary, ResponseDiary.class);
                responseDiary.setNickname(nickname);
                response.add(responseDiary);
            }
        }
        return response;
    }

}
