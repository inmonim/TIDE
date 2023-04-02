package com.tide.music.service.artist;

import com.tide.music.response.ResponseArtistInfo;

public interface ArtistService {
    ResponseArtistInfo getArtistInfo(Long artistId);

    void likeArtist(String email, Long artistId);
}
