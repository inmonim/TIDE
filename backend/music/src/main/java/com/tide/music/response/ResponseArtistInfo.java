package com.tide.music.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ResponseArtistInfo {
    private String artistName;
    private String artistImgPath;
    private List<String> title;
    private List<Long> songId;
    private Integer likeCnt;
}
