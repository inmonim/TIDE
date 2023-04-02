package com.tide.music.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseArtistList {
    private Long artistId;
    private String artistName;
    private String artistImgPath;
    private Integer likeCnt;
}
