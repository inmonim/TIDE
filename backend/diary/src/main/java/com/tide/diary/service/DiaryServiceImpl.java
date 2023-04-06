package com.tide.diary.service;

import com.tide.diary.client.MusicServiceClient;
import com.tide.diary.client.UserServiceClient;
import com.tide.diary.jpa.Diary;
import com.tide.diary.jpa.DiaryRepository;
import com.tide.diary.jpa.comment.DiaryCommentRepository;
import com.tide.diary.jpa.like.DiaryLikeUserRepository;
import com.tide.diary.request.RequestDiary;
import com.tide.diary.request.RequestPub;
import com.tide.diary.response.ResponseDiary;
import com.tide.diary.response.ResponseSearchSong;
import com.tide.diary.response.ResponseTopDiary;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    private final MusicServiceClient musicServiceClient;

    public DiaryServiceImpl(DiaryRepository diaryRepository,
                            DiaryLikeUserRepository diaryLikeUserRepository,
                            DiaryCommentRepository diaryCommentRepository,
                            UserServiceClient userServiceClient,
                            MusicServiceClient musicServiceClient) {
        this.diaryRepository = diaryRepository;
        this.diaryLikeUserRepository = diaryLikeUserRepository;
        this.diaryCommentRepository = diaryCommentRepository;
        this.userServiceClient = userServiceClient;
        this.musicServiceClient = musicServiceClient;
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
            response.setSongId(diary.getSongId());
            ResponseSearchSong responseSearchSong = musicServiceClient.getSongInfo(response.getSongId());
            response.setMusicTitle(responseSearchSong.getTitle());
            response.setAlbumImgPath(responseSearchSong.getAlbumImgPath());
            response.setArtist(responseSearchSong.getArtist());
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
                ResponseSearchSong responseSearchSong = musicServiceClient.getSongInfo(response.getSongId());
                response.setMusicTitle(responseSearchSong.getTitle());
                response.setAlbumImgPath(responseSearchSong.getAlbumImgPath());
                response.setArtist(responseSearchSong.getArtist());
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
                ResponseSearchSong responseSearchSong = musicServiceClient.getSongInfo(response.getSongId());
                response.setMusicTitle(responseSearchSong.getTitle());
                response.setAlbumImgPath(responseSearchSong.getAlbumImgPath());
                response.setArtist(responseSearchSong.getArtist());
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
        diary.setLikeCnt(0);
        diary.setSongId(request.getSongId());
        diary.setRating(0);

        ResponseSearchSong searchSong = musicServiceClient.getSongInfo(request.getSongId());
        if(searchSong != null){
            log.info("Searching =====================> ", searchSong.getTitle().toString());
            System.out.println(searchSong);
        }else {
            log.info("노래 없음");
        }
        diaryRepository.save(diary);
    }

    @Override
    @Transactional
    public ResponseDiary getDetailDiary(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        ModelMapper mapper = new ModelMapper();
        Long songId = diary.getSongId();
        ResponseSearchSong responseSearchSong = musicServiceClient.getSongInfo(songId);
        ResponseDiary response = mapper.map(diary, ResponseDiary.class);
        response.setNickname(userServiceClient.getNickname(diary.getUserId()));
        response.setSongId(songId);
        response.setMusicTitle(responseSearchSong.getTitle());
        response.setArtist(responseSearchSong.getArtist());
        response.setAlbumImgPath(responseSearchSong.getAlbumImgPath());
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
            ResponseSearchSong responseSearchSong = musicServiceClient.getSongInfo(response.getSongId());
            response.setMusicTitle(responseSearchSong.getTitle());
            response.setAlbumImgPath(responseSearchSong.getAlbumImgPath());
            response.setArtist(responseSearchSong.getArtist());
            diaryList.add(response);
        }
        return diaryList;
    }

    @Transactional
    public List<ResponseTopDiary> getTop3Diaries(Long songId) {
        List<ResponseTopDiary> response = new ArrayList<>();
        Pageable pageable = PageRequest.of(0,3);
        List<Diary> diaries = diaryRepository.findTop3DiariesBySongIdOrderByLikeCnt(songId, "0", pageable);
        for(Diary d : diaries) {
            ResponseTopDiary responseTopDiary = new ResponseTopDiary();
            responseTopDiary.setTitle(d.getTitle());
            responseTopDiary.setNickname(userServiceClient.getNickname(d.getUserId()));
            responseTopDiary.setLike(d.getLikeCnt());
            responseTopDiary.setId(d.getId());
            responseTopDiary.setCreateDt(d.getCreateDt());
            response.add(responseTopDiary);
        }
        return response;
    }

    @Transactional
    public List<ResponseTopDiary> getLatest3Diaries(Long songId) {
        List<ResponseTopDiary> response = new ArrayList<>();
        Pageable pageable = PageRequest.of(0,3);
        List<Diary> diaries = diaryRepository.findLatest3DiariesBySongId(songId, "0", pageable);
        for(Diary d : diaries) {
            ResponseTopDiary responseTopDiary = new ResponseTopDiary();
            responseTopDiary.setTitle(d.getTitle());
            responseTopDiary.setNickname(userServiceClient.getNickname(d.getUserId()));
            responseTopDiary.setLike(d.getLikeCnt());
            responseTopDiary.setId(d.getId());
            responseTopDiary.setCreateDt(d.getCreateDt());
            response.add(responseTopDiary);
        }
        return response;
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
        if (check) {
            List<Diary> diaries = diaryRepository.findAllByUserIdAndPubNot(userId, "2");
            for (Diary diary : diaries) {
                ResponseDiary responseDiary = mapper.map(diary, ResponseDiary.class);
                responseDiary.setNickname(nickname);
                ResponseSearchSong responseSearchSong = musicServiceClient.getSongInfo(responseDiary.getSongId());
                responseDiary.setMusicTitle(responseSearchSong.getTitle());
                responseDiary.setAlbumImgPath(responseSearchSong.getAlbumImgPath());
                responseDiary.setArtist(responseSearchSong.getArtist());
                response.add(responseDiary);
            }
        } else {
            List<Diary> followDiaries = diaryRepository.findAllByUserIdAndPub(userId, "0");
            for (Diary diary : followDiaries) {
                ResponseDiary responseDiary = mapper.map(diary, ResponseDiary.class);
                responseDiary.setNickname(nickname);
                ResponseSearchSong responseSearchSong = musicServiceClient.getSongInfo(responseDiary.getSongId());
                responseDiary.setMusicTitle(responseSearchSong.getTitle());
                responseDiary.setAlbumImgPath(responseSearchSong.getAlbumImgPath());
                responseDiary.setArtist(responseSearchSong.getArtist());
                response.add(responseDiary);
            }
        }
        return response;
    }

}
