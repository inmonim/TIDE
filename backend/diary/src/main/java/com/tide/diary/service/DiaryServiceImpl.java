package com.tide.diary.service;

import com.tide.diary.client.UserServiceClient;
import com.tide.diary.jpa.Diary;
import com.tide.diary.jpa.DiaryRepository;
import com.tide.diary.jpa.comment.DiaryComment;
import com.tide.diary.jpa.comment.DiaryCommentRepository;
import com.tide.diary.jpa.like.DiaryLikeUser;
import com.tide.diary.jpa.like.DiaryLikeUserRepository;
import com.tide.diary.request.RequestComment;
import com.tide.diary.request.RequestDiary;
import com.tide.diary.request.RequestPub;
import com.tide.diary.response.ResponseComment;
import com.tide.diary.response.ResponseDiary;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

        diaryRepository.save(diary);
    }

    @Override
    @Transactional
    public ResponseDiary getDiary(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        ModelMapper mapper = new ModelMapper();

        ResponseDiary response = mapper.map(diary, ResponseDiary.class);
        log.info("diary: ------------------>", diary.toString());
        response.setNickname(userServiceClient.getNickname(diary.getUserId()));
        return response;
    }

    @Override
    @Transactional
    public void cntLike(String email, Long diaryId) {
        Long userId = userServiceClient.getUserId(email);
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        diary.setLikeCnt(diary.getLikeCnt() + 1);
        DiaryLikeUser diaryLikeUser = new DiaryLikeUser();
        diaryLikeUser.setDiaryId(diaryId);
        diaryLikeUser.setUserId(userId);
        diaryLikeUserRepository.save(diaryLikeUser);
        diaryRepository.save(diary);
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
    public void comment(String email, Long diaryId, RequestComment request) {
        Long userId = userServiceClient.getUserId(email);
        String nickname = userServiceClient.getNickname(userId);
        LocalDateTime dateTime = LocalDateTime.now();
        DiaryComment diaryComment = new DiaryComment();
        diaryComment.setIsPublic("0");
        diaryComment.setComment(request.getComment());
        diaryComment.setCreateDt(Date.valueOf(String.valueOf(dateTime.toLocalDate())));
        diaryComment.setNickname(nickname);
        diaryComment.setDiaryId(diaryId);
        diaryCommentRepository.save(diaryComment);
    }

    @Override
    @Transactional
    public List<ResponseComment> getComments(Long diaryId) {
        List<ResponseComment> comments = new ArrayList<>();
        List<DiaryComment> diariesComments = diaryCommentRepository.findAllByDiaryId(diaryId);

        for(DiaryComment comment : diariesComments) {
            ResponseComment commentComment = new ResponseComment();
            commentComment.setId(comment.getId());
            commentComment.setComment(comment.getComment());
            commentComment.setNickname(comment.getNickname());
            commentComment.setCreateDt(comment.getCreateDt());
            comments.add(commentComment);
        }

        return comments;
    }

//    @Override
//    @Transactional
//    public void deleteComment(String email, Long commentId, String nickname) {
//        Long userId = userServiceClient.getUserId(email);
//        String checkNick = userServiceClient.getNickname(userId);
//
//        if(!nickname.equals(checkNick)) {
//            throw new IllegalArgumentException("작성자가 아닙니다.");
//        }
//        Optional<DiaryComment> diaryComment = diaryCommentRepository.findById(commentId);
//
//        diaryCommentRepository.delete(diaryComment);
//    }

}
