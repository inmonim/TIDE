package com.tide.music.service.artist;

import com.tide.music.client.UserServiceClient;
import com.tide.music.jpa.artist.Artist;
import com.tide.music.jpa.artist.ArtistRepository;
import com.tide.music.jpa.like.ArtistLikeUser;
import com.tide.music.jpa.like.ArtistLikeUserRepository;
import com.tide.music.jpa.song.Song;
import com.tide.music.jpa.song.SongRepository;
import com.tide.music.jpa.song.artist.SongArtist;
import com.tide.music.jpa.song.artist.SongArtistRepository;
import com.tide.music.response.ResponseArtistInfo;
import com.tide.music.response.ResponseArtistList;
import feign.Response;
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
public class ArtistServiceImpl implements ArtistService {
    private Environment env;
    private UserServiceClient userServiceClient;
    private ArtistLikeUserRepository artistLikeUserRepository;
    private ArtistRepository artistRepository;
    private SongArtistRepository songArtistRepository;
    private SongRepository songRepository;

    public ArtistServiceImpl(Environment env,
                             UserServiceClient userServiceClient,
                             ArtistLikeUserRepository artistLikeUserRepository,
                             ArtistRepository artistRepository,
                             SongArtistRepository songArtistRepository,
                             SongRepository songRepository) {
        this.env = env;
        this.userServiceClient = userServiceClient;
        this.artistLikeUserRepository = artistLikeUserRepository;
        this.artistRepository = artistRepository;
        this.songArtistRepository = songArtistRepository;
        this.songRepository = songRepository;
    }

    @Override
    @Transactional
    public ResponseArtistInfo getArtistInfo(Long artistId) {
        ResponseArtistInfo response = new ResponseArtistInfo();
        List<String> title = new ArrayList<>();
        List<Long> songId = new ArrayList<>();
        Artist artist = artistRepository.findByArtistId(artistId);
        if(artist == null) {
            throw new IllegalStateException("Artist not found");
        }
        response.setArtistName(artist.getArtistName());
        response.setLikeCnt(artist.getLikeCnt());
        response.setArtistImgPath(artist.getArtistImgPath());
        List<SongArtist> songArtists = songArtistRepository.findByArtistId(artistId);
        for(SongArtist songArtist : songArtists) {
            Song song = songRepository.findBySongId(songArtist.getSongId());
            title.add(song.getTitle());
            songId.add(song.getSongId());
        }
        response.setTitle(title);
        response.setSongId(songId);
        return response;
    }

    @Override
    @Transactional
    public void likeArtist(String email, Long artistId) {
        Artist artist = artistRepository.findByArtistId(artistId);
        if(artist == null) {
            throw new IllegalStateException("Artist not found");
        }
        Long userId = userServiceClient.getUserId(email);
        ArtistLikeUser artistLikeUser = artistLikeUserRepository.findByUserIdAndLikedArtistId(userId, artistId);
        if(artistLikeUser == null) {
            artistLikeUser = new ArtistLikeUser();
            artistLikeUser.setUserId(userId);
            artistLikeUser.setLikedArtistId(artistId);
            artist.setLikeCnt(artist.getLikeCnt() + 1);
            artistRepository.save(artist);
            artistLikeUserRepository.save(artistLikeUser);
        } else {
            artist.setLikeCnt(artist.getLikeCnt() - 1);
            artistLikeUserRepository.delete(artistLikeUser);
        }
    }

    @Override
    @Transactional
    public List<ResponseArtistList> getArtistTopList() {
        Pageable pageable = PageRequest.of(0, 6);
        List<Artist> artists = artistRepository.findTopByLikeCnt(pageable);
        List<ResponseArtistList> response = new ArrayList<>();
        for(Artist artist : artists) {
            ResponseArtistList temp = new ResponseArtistList();
            temp.setArtistName(artist.getArtistName());
            temp.setLikeCnt(artist.getLikeCnt());
            temp.setArtistImgPath(artist.getArtistImgPath());
            temp.setArtistId(artist.getArtistId());
            response.add(temp);
        }

        return response;
    }

    @Override
    @Transactional
    public boolean likeCheck(Long artistId, String email) {
        Long userId = userServiceClient.getUserId(email);
        ArtistLikeUser artistLikeUser = artistLikeUserRepository.findByUserIdAndLikedArtistId(userId, artistId);
        if(artistLikeUser != null) {
            return true;
        }
        return false;
    }
}
