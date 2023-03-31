package com.tide.diary.service.list;

import com.tide.diary.client.UserServiceClient;
import com.tide.diary.jpa.Diary;
import com.tide.diary.jpa.DiaryRepository;
import com.tide.diary.jpa.diarylist.DiaryDiaryList;
import com.tide.diary.jpa.diarylist.DiaryDiaryListRepository;
import com.tide.diary.jpa.list.DiaryList;
import com.tide.diary.jpa.list.DiaryListRepository;
import com.tide.diary.request.RequestDeleteDiaryList;
import com.tide.diary.request.RequestListTitle;
import com.tide.diary.response.ResponseDiary;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DiaryListServiceImpl implements DiaryListService {

    private Environment env;
    private DiaryRepository diaryRepository;
    private DiaryListRepository diaryListRepository;
    private DiaryDiaryListRepository diaryDiaryListRepository;
    private UserServiceClient userServiceClient;

    public DiaryListServiceImpl(Environment env,
                                DiaryListRepository diaryListRepository,
                                DiaryDiaryListRepository diaryDiaryListRepository,
                                UserServiceClient userServiceClient,
                                DiaryRepository diaryRepository) {
        this.env = env;
        this.diaryListRepository = diaryListRepository;
        this.diaryDiaryListRepository = diaryDiaryListRepository;
        this.userServiceClient = userServiceClient;
        this.diaryRepository = diaryRepository;
    }

    // 다이어리 리스트 생성
    @Override
    @Transactional
    public void addList(String email, RequestListTitle request) {
        log.info("신청이메일 ========>", email.toString());
        Long userId = userServiceClient.getUserId(email);
        DiaryList diaryList = new DiaryList();
        diaryList.setUserId(userId);
        diaryList.setDiaryListTitle(request.getDiaryListTitle());
        diaryListRepository.save(diaryList);
    }

    // 내 다이어리 리스트 조회
    @Override
    @Transactional
    public List<DiaryList> getMyDiaryList(String email) {
        Long userId = userServiceClient.getUserId(email);
        List<DiaryList> diaryLists = diaryListRepository.findAllByUserId(userId);
        return diaryLists;
    }

    // 다이어리 리스트에 다이어리 넣기
    @Override
    @Transactional
    public void diaryAdd(String email, Long diaryId, RequestListTitle request) {
        DiaryList diaryList = diaryListRepository.findByDiaryListTitle(request.getDiaryListTitle());
        Long listId = diaryList.getId();
        DiaryDiaryList diaryDiaryList = new DiaryDiaryList();
        diaryDiaryList.setDiaryListId(listId);
        diaryDiaryList.setDiaryId(diaryId);
        diaryDiaryListRepository.save(diaryDiaryList);
    }

    @Override
    @Transactional
    public List<ResponseDiary> getListDiary(String email, Long diaryListId) {
        List<DiaryDiaryList> diaryDiaryLists = diaryDiaryListRepository.findAllByDiaryListId(diaryListId);
        List<ResponseDiary> response = new ArrayList<>();
        Long userId = userServiceClient.getUserId(email);
        String checkName = userServiceClient.getNickname(userId);

        for (DiaryDiaryList diaryDiaryList : diaryDiaryLists) {
            Optional<Diary> diary = diaryRepository.findById(diaryDiaryList.getDiaryId());
            ResponseDiary responseDiary = new ResponseDiary();
            String nickname = userServiceClient.getNickname(diary.get().getUserId());
            if(!nickname.equals(checkName)) {
                throw new IllegalArgumentException("다른 사용자입니다.");
            }
            responseDiary.setNickname(nickname);
            responseDiary.setTitle(diary.get().getTitle());
            responseDiary.setLike(diary.get().getLikeCnt());
            responseDiary.setCreateDt(diary.get().getCreateDt());
            responseDiary.setContent(diary.get().getContent());
            responseDiary.setPub(diary.get().getPub());
            responseDiary.setId(diary.get().getId());
            response.add(responseDiary);
        }

        return response;
    }

    @Override
    @Transactional
    public void deleteListDiary(String email, RequestDeleteDiaryList request) {
        Long userId = userServiceClient.getUserId(email);
        Optional<Diary> diary = diaryRepository.findById(request.getDiaryId());
        if (userId != diary.get().getUserId()) {
            throw new IllegalArgumentException("작성자가 아닙니다.");
        }
        DiaryDiaryList diaryDiaryList = diaryDiaryListRepository
                .findByDiaryListIdAndDiaryId(request.getDiaryListId(), request.getDiaryId());

        diaryDiaryListRepository.delete(diaryDiaryList);
    }

    @Override
    public void updateListDiary(String email, Long diaryListId, String diaryListTitle) {
        Long userId = userServiceClient.getUserId(email);
        Optional<DiaryList> diaryList = diaryListRepository.findById(diaryListId);
        Long checkId = diaryList.get().getUserId();
        if(userId != checkId) {
            throw new IllegalStateException("작성자가 아닙니다");
        }
        diaryList.get().setDiaryListTitle(diaryListTitle);
        diaryListRepository.save(diaryList.get());
    }

    @Override
    public void deleteList(String email, Long diaryListId) {
        Long userId = userServiceClient.getUserId(email);
        Optional<DiaryList> diaryList = diaryListRepository.findById(diaryListId);
        Long checkId = diaryList.get().getUserId();
        if(userId != checkId) {
            throw new IllegalStateException("작성자가 아닙니다");
        }
        diaryListRepository.delete(diaryList.get());
    }

}
