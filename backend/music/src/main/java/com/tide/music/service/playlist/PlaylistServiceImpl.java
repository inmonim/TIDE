package com.tide.music.service.playlist;

import com.tide.music.client.UserServiceClient;
import com.tide.music.jpa.playlist.like.PlaylistLikeUser;
import com.tide.music.jpa.playlist.like.PlaylistLikeUserRepository;
import com.tide.music.jpa.playlist.song.PlaylistSong;
import com.tide.music.jpa.playlist.song.PlaylistSongRepository;
import com.tide.music.jpa.userplaylist.UserPlaylist;
import com.tide.music.jpa.userplaylist.UserPlaylistRepository;
import com.tide.music.request.RequestPlaylist;
import com.tide.music.request.RequestPlaylistInfo;
import com.tide.music.response.ResponsePlaylist;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PlaylistServiceImpl implements PlaylistService {

    private Environment env;
    private UserPlaylistRepository userPlayListRepository;
    private UserServiceClient userServiceClient;
    private PlaylistSongRepository playlistSongRepository;
    private PlaylistLikeUserRepository playlistLikeUserRepository;

    public PlaylistServiceImpl(Environment env,
                               UserPlaylistRepository userPlayListRepository,
                               UserServiceClient userServiceClient,
                               PlaylistSongRepository playlistSongRepository,
                               PlaylistLikeUserRepository playlistLikeUserRepository) {
        this.env = env;
        this.userPlayListRepository = userPlayListRepository;
        this.userServiceClient = userServiceClient;
        this.playlistSongRepository = playlistSongRepository;
        this.playlistLikeUserRepository = playlistLikeUserRepository;
    }

    @Override
    @Transactional
    public void addPlaylist(String email, RequestPlaylist request) {
        Long userId = userServiceClient.getUserId(email);
        UserPlaylist userPlayList = new UserPlaylist();
        userPlayList.setUserId(userId);
        userPlayList.setPlayListTitle(request.getPlayListTitle());
        userPlayList.setIsPublic(request.getIsPublic());
        userPlayList.setLikeCnt(0);
        userPlayListRepository.save(userPlayList);
    }

    @Override
    @Transactional
    public List<ResponsePlaylist> getMyPlaylists(String email) {
        Long userId = userServiceClient.getUserId(email);
        List<ResponsePlaylist> playlists = new ArrayList<>();
        List<UserPlaylist> list = userPlayListRepository.findAllByUserId(userId);

        for (UserPlaylist userPlaylist : list) {
            ResponsePlaylist playlist = new ResponsePlaylist();
            playlist.setPlaylistTitle(userPlaylist.getPlayListTitle());
            playlist.setId(userPlaylist.getId());
            playlist.setLikeCnt(userPlaylist.getLikeCnt());
            playlist.setIsPublic(userPlaylist.getIsPublic());
            playlists.add(playlist);
        }

        return playlists;
    }

    @Override
    @Transactional
    public List<ResponsePlaylist> getPlaylists(String email, String nickname) {
        boolean check = userServiceClient.enableFollow(email, nickname);
        List<ResponsePlaylist> playlists = new ArrayList<>();
        Long userId = userServiceClient.getId(nickname);

        if (check) {
            List<UserPlaylist> list = userPlayListRepository.findAllByUserIdAndIsPublicNot(userId, "2");
            for (UserPlaylist userPlaylist : list) {
                ResponsePlaylist playlist = new ResponsePlaylist();
                playlist.setPlaylistTitle(userPlaylist.getPlayListTitle());
                playlist.setId(userPlaylist.getId());
                playlist.setLikeCnt(userPlaylist.getLikeCnt());
                playlist.setIsPublic(userPlaylist.getIsPublic());
                playlists.add(playlist);
            }
        } else {
            List<UserPlaylist> list = userPlayListRepository.findAllByUserIdAndIsPublic(userId, "0");
            for (UserPlaylist userPlaylist : list) {
                ResponsePlaylist playlist = new ResponsePlaylist();
                playlist.setPlaylistTitle(userPlaylist.getPlayListTitle());
                playlist.setId(userPlaylist.getId());
                playlist.setLikeCnt(userPlaylist.getLikeCnt());
                playlist.setIsPublic(userPlaylist.getIsPublic());
                playlists.add(playlist);
            }
        }

        return playlists;
    }

    @Override
    @Transactional
    public void addSongToPlaylist(String email, Long songId, Long playlistId) {
        checkUser(email, playlistId);

        PlaylistSong checkSong = playlistSongRepository.findByPlaylistIdAndSongId(playlistId, songId);
        PlaylistSong playlistSong = new PlaylistSong();
        if (checkSong != null) {
            throw new IllegalStateException("이미 등록된 노래입니다");
        } else {
            playlistSong.setPlaylistId(playlistId);
            playlistSong.setSongId(songId);
        }

        playlistSongRepository.save(playlistSong);
    }

    @Override
    @Transactional
    public void updateSongInPlaylist(String email, RequestPlaylistInfo request) {
        checkUser(email, request.getPlaylistId());

        UserPlaylist userPlaylist = userPlayListRepository.findById(request.getPlaylistId()).orElse(null);
        if (userPlaylist == null) {
            throw new IllegalStateException("존재하지 않는 플레이리스트입니다.");
        }
        userPlaylist.setIsPublic(request.getIsPublic());
        userPlaylist.setPlayListTitle(request.getPlaylistTitle());
        userPlayListRepository.save(userPlaylist);
    }

    @Override
    @Transactional
    public void likePlaylist(String email, Long playlistId) {
        Long userId = userServiceClient.getUserId(email);
        UserPlaylist userPlaylist = userPlayListRepository.findById(playlistId).orElse(null);
        if (userPlaylist == null) {
            throw new IllegalStateException("존재하지 않는 플레이리스트입니다.");
        } else if (userId == userPlaylist.getUserId()) {
            throw new IllegalStateException("자기자신의 플레이리스트는 좋아요 할 수 없습니다.");
        } else {
            PlaylistLikeUser check = playlistLikeUserRepository
                    .findByUserIdAndPlaylistId(userId, playlistId);
            if (check == null) {
                PlaylistLikeUser playlistLikeUser = new PlaylistLikeUser();
                playlistLikeUser.setPlaylistId(playlistId);
                playlistLikeUser.setUserId(userId);
                userPlaylist.setLikeCnt(userPlaylist.getLikeCnt() + 1);
                playlistLikeUserRepository.save(playlistLikeUser);
                userPlayListRepository.save(userPlaylist);
            } else if (check != null) {
                userPlaylist.setLikeCnt(userPlaylist.getLikeCnt() - 1);
                playlistLikeUserRepository.delete(check);
                userPlayListRepository.save(userPlaylist);
            }
        }
    }

    @Override
    public void deleteSongFromPlaylist(String email, Long songId, Long playlistId) {
        checkUser(email, playlistId);

        PlaylistSong playlistSong = playlistSongRepository.findByPlaylistIdAndSongId(playlistId, songId);
        if (playlistSong != null) {
            playlistSongRepository.delete(playlistSong);
        } else {
            throw new IllegalStateException("플레이리스트에 존재하지 않는 노래입니다.");
        }
    }

    @Override
    public void deletePlaylist(String email, Long playlistId) {
        checkUser(email, playlistId);

        UserPlaylist userPlaylist = userPlayListRepository.findById(playlistId).orElse(null);
        if (userPlaylist != null) {
            userPlayListRepository.delete(userPlaylist);
        } else {
            throw new IllegalStateException("존재하지 않는 플레이리스트입니다.");
        }
    }

    public void checkUser(String email, Long playlistId) {
        Long userId = userServiceClient.getUserId(email);
        UserPlaylist userPlaylist = userPlayListRepository.findById(playlistId).orElse(null);
        Long check = userPlaylist.getUserId();
        if (check != userId) {
            throw new IllegalStateException("자신의 플레이리스트가 아닙니다.");
        }
    }
}
