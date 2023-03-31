package com.tide.music.service.playlist;

import com.tide.music.client.UserServiceClient;
import com.tide.music.jpa.playlist.UserPlaylist;
import com.tide.music.jpa.playlist.UserPlaylistRepository;
import com.tide.music.request.RequestPlaylist;
import com.tide.music.response.ResponsePlaylist;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PlaylistServiceImpl implements PlaylistService {

    private Environment env;
    private UserPlaylistRepository userPlayListRepository;
    private UserServiceClient userServiceClient;

    public PlaylistServiceImpl(Environment env,
                               UserPlaylistRepository userPlayListRepository,
                               UserServiceClient userServiceClient) {
        this.env = env;
        this.userPlayListRepository = userPlayListRepository;
        this.userServiceClient = userServiceClient;
    }

    @Override
    public void addPlaylist(String email, RequestPlaylist request) {
        Long userId = userServiceClient.getUserId(email);
        UserPlaylist userPlayList = new UserPlaylist();
        userPlayList.setUserId(userId);
        userPlayList.setPlayListTitle(request.getPlayListTitle());
        userPlayList.setIsPublic(request.getIsPublic());
        userPlayListRepository.save(userPlayList);
    }

    @Override
    public List<ResponsePlaylist> getMyPlaylists(String email) {
        Long userId = userServiceClient.getUserId(email);
        List<ResponsePlaylist> playlists = new ArrayList<>();
        List<UserPlaylist> list = userPlayListRepository.findAllByUserId(userId);

        for (UserPlaylist userPlaylist : list) {
            ResponsePlaylist playlist = new ResponsePlaylist();
            playlist.setPlaylistTitle(userPlaylist.getPlayListTitle());
            playlist.setId(userPlaylist.getId());
            playlist.setIsPublic(userPlaylist.getIsPublic());
            playlists.add(playlist);
        }

        return playlists;
    }
}
