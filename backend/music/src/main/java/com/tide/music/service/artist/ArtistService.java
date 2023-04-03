package com.tide.music.service.artist;

import com.tide.music.response.ResponseArtistInfo;
import com.tide.music.response.ResponseArtistList;

import java.util.List;

public interface ArtistService {
    ResponseArtistInfo getArtistInfo(Long artistId);

    void likeArtist(String email, Long artistId);

    List<ResponseArtistList> getArtistTopList();

    boolean likeCheck(Long artistId, String email);
}
