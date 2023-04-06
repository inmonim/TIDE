package com.tide.music.service.playlist;

import com.tide.music.client.UserServiceClient;
import com.tide.music.jpa.album.Album;
import com.tide.music.jpa.album.AlbumRepository;
import com.tide.music.jpa.artist.Artist;
import com.tide.music.jpa.artist.ArtistRepository;
import com.tide.music.jpa.playlist.like.PlaylistLikeUser;
import com.tide.music.jpa.playlist.like.PlaylistLikeUserRepository;
import com.tide.music.jpa.playlist.song.PlaylistSong;
import com.tide.music.jpa.playlist.song.PlaylistSongRepository;
import com.tide.music.jpa.song.Song;
import com.tide.music.jpa.song.SongRepository;
import com.tide.music.jpa.song.album.SongAlbum;
import com.tide.music.jpa.song.album.SongAlbumRepository;
import com.tide.music.jpa.song.artist.SongArtist;
import com.tide.music.jpa.song.artist.SongArtistRepository;
import com.tide.music.jpa.userplaylist.UserPlaylist;
import com.tide.music.jpa.userplaylist.UserPlaylistRepository;
import com.tide.music.request.RequestPlaylist;
import com.tide.music.request.RequestPlaylistInfo;
import com.tide.music.response.ResponseListSong;
import com.tide.music.response.ResponseListUser;
import com.tide.music.response.ResponsePlaylist;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Slf4j
public class PlaylistServiceImpl implements PlaylistService {

    private Environment env;
    private UserPlaylistRepository userPlayListRepository;
    private UserServiceClient userServiceClient;
    private PlaylistSongRepository playlistSongRepository;
    private PlaylistLikeUserRepository playlistLikeUserRepository;
    private SongRepository songRepository;
    private AlbumRepository albumRepository;
    private ArtistRepository artistRepository;
    private SongAlbumRepository songAlbumRepository;
    private SongArtistRepository songArtistRepository;

    public PlaylistServiceImpl(Environment env,
                               UserPlaylistRepository userPlayListRepository,
                               UserServiceClient userServiceClient,
                               PlaylistSongRepository playlistSongRepository,
                               PlaylistLikeUserRepository playlistLikeUserRepository,
                               SongRepository songRepository,
                               AlbumRepository albumRepository,
                               ArtistRepository artistRepository,
                               SongAlbumRepository songAlbumRepository,
                               SongArtistRepository songArtistRepository) {
        this.env = env;
        this.userPlayListRepository = userPlayListRepository;
        this.userServiceClient = userServiceClient;
        this.playlistSongRepository = playlistSongRepository;
        this.playlistLikeUserRepository = playlistLikeUserRepository;
        this.songRepository = songRepository;
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
        this.songAlbumRepository = songAlbumRepository;
        this.songArtistRepository = songArtistRepository;
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
    public List<ResponseListSong> getPlaylistInfo(String email, Long playlistId) {
        List<PlaylistSong> playlistsongs = playlistSongRepository.findAllByPlaylistId(playlistId);
        List<Song> songs = new ArrayList<>();
        for (PlaylistSong playlistSong : playlistsongs) {
            songs.add(songRepository.findBySongId(playlistSong.getSongId()));
        }
        List<ResponseListSong> responseSearchSongList = new ArrayList<>();
        for (Song song : songs) {
            ResponseListSong responseListSong = new ResponseListSong();
            SongAlbum songAlbum = songAlbumRepository.findBySongId(song.getSongId());
            responseListSong.setVideoId(song.getVideoId());
            List<SongArtist> songArtists = songArtistRepository.findAllBySongId(song.getSongId());
            Album album = albumRepository.findByAlbumId(songAlbum.getAlbumId());
            if (songAlbum == null || songArtists == null || album == null) {
                continue;
            }
            List<String> artistName = new ArrayList();
            responseListSong.setTitle(song.getTitle());
            for (SongArtist songArtist : songArtists) {
                Artist temp = artistRepository.findByArtistId(songArtist.getArtistId());
                if (temp == null) {
                    continue;
                }
                artistName.add(temp.getArtistName());
            }
            responseListSong.setSongId(song.getSongId());
            responseListSong.setAlbumImgPath(album.getAlbumImgPath());
            responseListSong.setArtist(artistName);
            responseSearchSongList.add(responseListSong);
        }
        return responseSearchSongList;
    }

    @Override
    @Transactional
    public ResponseListUser getPlaylistUsers(String email, Long playlistId) {
        Optional<UserPlaylist> playlist = userPlayListRepository.findById(playlistId);
        Long check = playlist.get().getUserId();
        String nickname = userServiceClient.getNickname(check);
        ResponseListUser response = new ResponseListUser();
        response.setLikecnt(playlist.get().getLikeCnt());
        response.setPlaylistId(playlistId);
        response.setPlaylistTitle(playlist.get().getPlayListTitle());
        response.setNickname(nickname);

        return response;
    }

    @Override
    @Transactional
    public List<ResponsePlaylist> getTopPlaylists() {
        Pageable pageable = PageRequest.of(0, 30);
        List<ResponsePlaylist> response = new ArrayList<>();
        List<UserPlaylist> userPlaylist30 = userPlayListRepository.findTopPlaylist(pageable, "0");
        List<UserPlaylist> userPlaylists = new ArrayList<>();
        Random random = new Random();
        userPlaylists.add(userPlaylist30.get(0));
        for (int i = 0; i < 6; i++) {
            int randomNumber = random.nextInt(userPlaylist30.size());
            userPlaylists.add(userPlaylist30.get(randomNumber));
            userPlaylist30.remove(randomNumber);
        }
        for (UserPlaylist userPlaylist : userPlaylists) {
            ResponsePlaylist playlist = new ResponsePlaylist();
            playlist.setPlaylistTitle(userPlaylist.getPlayListTitle());
            playlist.setId(userPlaylist.getId());
            playlist.setLikeCnt(userPlaylist.getLikeCnt());
            playlist.setIsPublic(userPlaylist.getIsPublic());
            response.add(playlist);
        }

        return response;
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
    public boolean getLikedPlaylists(String email, Long playlistId) {
        Long userId = userServiceClient.getUserId(email);
        PlaylistLikeUser playlistLikeUser = playlistLikeUserRepository.findByUserIdAndPlaylistId(userId, playlistId);
        if (playlistLikeUser != null) {
            return true;
        } else {
            return false;
        }
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
