package com.tide.diary.service.comment;

import com.tide.diary.client.UserServiceClient;
import com.tide.diary.jpa.DiaryRepository;
import com.tide.diary.jpa.comment.DiaryComment;
import com.tide.diary.jpa.comment.DiaryCommentRepository;
import com.tide.diary.jpa.like.DiaryLikeUserRepository;
import com.tide.diary.request.RequestComment;
import com.tide.diary.response.ResponseComment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class DiaryCommentServiceImpl implements DiaryCommentService{
    private final DiaryRepository diaryRepository;
    private final DiaryCommentRepository diaryCommentRepository;
    private final UserServiceClient userServiceClient;

    public DiaryCommentServiceImpl(DiaryRepository diaryRepository,
                                   DiaryCommentRepository diaryCommentRepository,
                                   UserServiceClient userServiceClient) {
        this.diaryRepository = diaryRepository;
        this.diaryCommentRepository = diaryCommentRepository;
        this.userServiceClient = userServiceClient;
    }


    @Override
    @Transactional
    public void comment(String email, Long diaryId, RequestComment request) {
        Long userId = userServiceClient.getUserId(email);
        String nickname = userServiceClient.getNickname(userId);
        LocalDateTime dateTime = LocalDateTime.now();
        DiaryComment diaryComment = new DiaryComment();
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

        for (DiaryComment comment : diariesComments) {
            ResponseComment commentComment = new ResponseComment();
            commentComment.setId(comment.getId());
            commentComment.setComment(comment.getComment());
            commentComment.setNickname(comment.getNickname());
            commentComment.setCreateDt(comment.getCreateDt());
            comments.add(commentComment);
        }

        return comments;
    }

    @Override
    @Transactional
    public void deleteComment(String email, Long commentId, String nickname) {
        Long userId = userServiceClient.getUserId(email);
        String checkNick = userServiceClient.getNickname(userId);
        DiaryComment diaryComment = diaryCommentRepository.findById(commentId).orElse(null);
        log.info("checkNick: {}", diaryComment.getNickname().toString());
        if (!nickname.equals(diaryComment.getNickname()))
            throw new IllegalStateException("작성자가 아닙니다.");

        if (!nickname.equals(checkNick))
            throw new IllegalArgumentException("작성자가 아닙니다.");


        diaryCommentRepository.deleteById(commentId);
    }
}
