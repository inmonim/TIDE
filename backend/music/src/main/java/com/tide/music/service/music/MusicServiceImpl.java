package com.tide.music.service.music;


import com.tide.music.client.UserServiceClient;
import com.tide.music.jpa.album.Album;
import com.tide.music.jpa.album.AlbumRepository;
import com.tide.music.jpa.artist.Artist;
import com.tide.music.jpa.artist.ArtistRepository;
import com.tide.music.jpa.like.ArtistLikeUserRepository;
import com.tide.music.jpa.like.SongLikeUser;
import com.tide.music.jpa.like.SongLikeUserRepository;
import com.tide.music.jpa.lyrics.Lyrics;
import com.tide.music.jpa.lyrics.LyricsRepository;
import com.tide.music.jpa.song.Song;
import com.tide.music.jpa.song.SongRepository;
import com.tide.music.jpa.song.album.SongAlbum;
import com.tide.music.jpa.song.album.SongAlbumRepository;
import com.tide.music.jpa.song.artist.SongArtist;
import com.tide.music.jpa.song.artist.SongArtistRepository;
import com.tide.music.response.ResponseSearchSong;
import com.tide.music.response.ResponseSongInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MusicServiceImpl implements MusicService {

    private Environment env;
    private AlbumRepository albumRepository;
    private SongRepository songRepository;
    private SongAlbumRepository songAlbumRepository;
    private ArtistRepository artistRepository;
    private SongArtistRepository songArtistRepository;
    private LyricsRepository lyricsRepository;
    private SongLikeUserRepository songLikeUserRepository;
    private UserServiceClient userServiceClient;

    public MusicServiceImpl(Environment env,
                            AlbumRepository albumRepository,
                            SongRepository songRepository,
                            SongAlbumRepository songAlbumRepository,
                            ArtistRepository artistRepository,
                            SongArtistRepository songArtistRepository,
                            LyricsRepository lyricsRepository,
                            ArtistLikeUserRepository artistLikeUserRepository,
                            SongLikeUserRepository songLikeUserRepository,
                            UserServiceClient userServiceClient) {
        this.env = env;
        this.albumRepository = albumRepository;
        this.songRepository = songRepository;
        this.songAlbumRepository = songAlbumRepository;
        this.artistRepository = artistRepository;
        this.songArtistRepository = songArtistRepository;
        this.lyricsRepository = lyricsRepository;
        this.songLikeUserRepository = songLikeUserRepository;
        this.userServiceClient = userServiceClient;
    }

    @Override
    @Transactional
    public List<ResponseSearchSong> searchSongList(String title) {
        Pageable pageable = PageRequest.of(0, 30);
        List<Song> songs = songRepository.findTitle(title, pageable);
        List<ResponseSearchSong> responseSearchSongList = new ArrayList<>();
        for (Song song : songs) {
            ResponseSearchSong responseSearchSong = new ResponseSearchSong();
            SongAlbum songAlbum = songAlbumRepository.findBySongId(song.getSongId());
            List<SongArtist> songArtists = songArtistRepository.findAllBySongId(song.getSongId());
            Album album = albumRepository.findByAlbumId(songAlbum.getAlbumId());
            if (songAlbum == null || songArtists == null || album == null) {
                continue;
            }
            List<String> artistName = new ArrayList();
            responseSearchSong.setTitle(song.getTitle());
            for (SongArtist songArtist : songArtists) {
                Artist temp = artistRepository.findByArtistId(songArtist.getArtistId());
                if (temp == null) {
                    continue;
                }
                artistName.add(temp.getArtistName());
            }
            responseSearchSong.setSongId(song.getSongId());
            responseSearchSong.setAlbumImgPath(album.getAlbumImgPath());
            responseSearchSong.setArtist(artistName);
            responseSearchSongList.add(responseSearchSong);
        }
        ;

        return responseSearchSongList;
    }

    @Override
    @Transactional
    public ResponseSongInfo searchSong(Long songId) {
        ResponseSongInfo responseSongInfo = new ResponseSongInfo();
        Song song = songRepository.findBySongId(songId);
        Album album = albumRepository.findByAlbumId(songAlbumRepository.findBySongId(song.getSongId()).getAlbumId());
        List<SongArtist> songArtists = songArtistRepository.findAllBySongId(songId);
        if (song == null) {
            throw new IllegalArgumentException("제대로 된 음악 정보 요청이 아닙니다.");
        }
        if (album == null) {
            responseSongInfo.setAlbumTitle("앨범 정보 없음");
        } else {
            responseSongInfo.setAlbumTitle(album.getAlbumTitle());
            responseSongInfo.setAlbumImgPath(album.getAlbumImgPath());
            responseSongInfo.setReleaseDt(album.getReleaseDt());
        }
        if (songArtists == null) {
            List<String> check = new ArrayList<>();
            check.add("아티스트 정보 없음");
            responseSongInfo.setArtistName(check);
        } else {
            List<Artist> artists = new ArrayList<>();
            for (SongArtist songArtist : songArtists) {
                Artist artist = artistRepository.findByArtistId(songArtist.getArtistId());
                artists.add(artist);
            }
            List<Long> artistId = new ArrayList<>();
            List<String> artistName = new ArrayList<>();
            List<String> artistImgPath = new ArrayList<>();
            for (Artist artist : artists) {
                artistId.add(artist.getArtistId());
                artistName.add(artist.getArtistName());
                artistImgPath.add(artist.getArtistImgPath());
            }
            responseSongInfo.setArtistId(artistId);
            responseSongInfo.setArtistName(artistName);
            responseSongInfo.setArtistImgPath(artistImgPath);
        }
        Lyrics lyrics = lyricsRepository.findBySongId(songId);
        if (lyrics == null) {
            responseSongInfo.setLyrics("가사정보가 존재하지 않습니다.");
        } else {
            responseSongInfo.setLyrics(lyrics.getLyrics());
        }
        responseSongInfo.setTitle(song.getTitle());
        responseSongInfo.setVideoId(song.getVideoId());
        responseSongInfo.setLikeCnt(song.getLikeCnt());

        return responseSongInfo;
    }

    @Override
    @Transactional
    public void likeSong(Long songId, String email) {
        Song song = songRepository.findBySongId(songId);
        if (song == null) {
            throw new IllegalStateException("존재하지 않는 노래입니다.");
        }
        Long userId = userServiceClient.getUserId(email);
        SongLikeUser songLikeUser = songLikeUserRepository.findBySongIdAndUserId(songId, userId);
        if (songLikeUser == null) {
            songLikeUser = new SongLikeUser();
            songLikeUser.setSongId(songId);
            songLikeUser.setUserId(userId);
            song.setLikeCnt(song.getLikeCnt() + 1);
            songRepository.save(song);
            songLikeUserRepository.save(songLikeUser);
        } else {
            song.setLikeCnt(song.getLikeCnt() - 1);
            songLikeUserRepository.delete(songLikeUser);
        }
    }

    @Override
    @Transactional
    public boolean likeCheck(Long songId, String email) {
        Long userId = userServiceClient.getUserId(email);
        SongLikeUser songLikeUser = songLikeUserRepository.findBySongIdAndUserId(songId, userId);
        if (songLikeUser != null) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    @Transactional
    public ResponseSearchSong getSongInfo(Long songId) {
        Song song = songRepository.findBySongId(songId);
        ResponseSearchSong responseSearchSong = new ResponseSearchSong();
        SongAlbum songAlbum = songAlbumRepository.findBySongId(song.getSongId());
        List<SongArtist> songArtists = songArtistRepository.findAllBySongId(song.getSongId());
        Album album = albumRepository.findByAlbumId(songAlbum.getAlbumId());
        if (songAlbum == null || album == null) {
            responseSearchSong.setAlbumImgPath(null);
        } else {
            responseSearchSong.setAlbumImgPath(album.getAlbumImgPath());
        }

        if (songArtists == null) {
            responseSearchSong.setArtist(null);
        } else {
            List<String> artistName = new ArrayList();
            responseSearchSong.setTitle(song.getTitle());
            for (SongArtist songArtist : songArtists) {
                Artist temp = artistRepository.findByArtistId(songArtist.getArtistId());
                if (temp == null) {
                    continue;
                }
                artistName.add(temp.getArtistName());
            }
            responseSearchSong.setArtist(artistName);
        }
        responseSearchSong.setTitle(song.getTitle());
        responseSearchSong.setSongId(song.getSongId());
        responseSearchSong.setVideoId(song.getVideoId());
        return responseSearchSong;
    }
}
