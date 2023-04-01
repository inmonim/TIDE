package com.tide.music.service.music;


import com.tide.music.jpa.album.Album;
import com.tide.music.jpa.album.AlbumRepository;
import com.tide.music.jpa.artist.Artist;
import com.tide.music.jpa.artist.ArtistRepository;
import com.tide.music.jpa.song.Song;
import com.tide.music.jpa.song.SongRepository;
import com.tide.music.jpa.song.album.SongAlbum;
import com.tide.music.jpa.song.album.SongAlbumRepository;
import com.tide.music.jpa.song.artist.SongArtist;
import com.tide.music.jpa.song.artist.SongArtistRepository;
import com.tide.music.response.ResponseSearchSong;
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
public class MusicServiceImpl implements MusicService{

    private Environment env;
    private AlbumRepository albumRepository;
    private SongRepository songRepository;
    private SongAlbumRepository songAlbumRepository;
    private ArtistRepository artistRepository;
    private SongArtistRepository songArtistRepository;

    public MusicServiceImpl(Environment env,
                            AlbumRepository albumRepository,
                            SongRepository songRepository,
                            SongAlbumRepository songAlbumRepository,
                            ArtistRepository artistRepository,
                            SongArtistRepository songArtistRepository) {
        this.env = env;
        this.albumRepository = albumRepository;
        this.songRepository = songRepository;
        this.songAlbumRepository = songAlbumRepository;
        this.artistRepository = artistRepository;
        this.songArtistRepository = songArtistRepository;
    }

    @Override
    @Transactional
    public List<ResponseSearchSong> searchSongList(String title) {
        Pageable pageable = PageRequest.of(0, 30);
        List<Song> songs = songRepository.findTitle(title, pageable);
        List<ResponseSearchSong> responseSearchSongList = new ArrayList<>();
        for (Song song : songs) {
            ResponseSearchSong responseSearchSong = new ResponseSearchSong();
            log.info(song.toString());
            SongAlbum songAlbum = songAlbumRepository.findBySongId(song.getSongId());
            List<SongArtist> songArtists = songArtistRepository.findAllBySongId(song.getSongId());
            Album album = albumRepository.findByAlbumId(songAlbum.getAlbumId());
            if(songAlbum == null || songArtists == null || album == null) {
                continue;
            }
            List<String> artistName = new ArrayList();
            responseSearchSong.setTitle(song.getTitle());
            for (SongArtist songArtist : songArtists) {
                Artist temp = artistRepository.findByArtistId(songArtist.getArtistId());
                if(temp == null) {continue;}
                artistName.add(temp.getArtistName());
            }
            responseSearchSong.setSongId(song.getSongId());
            responseSearchSong.setAlbumImgPath(album.getAlbumImgPath());
            responseSearchSong.setArtist(artistName);
            responseSearchSongList.add(responseSearchSong);
        };

        return responseSearchSongList;
    }
}
