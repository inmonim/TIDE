package com.tide.music.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ResponseSongInfo {
    private String title;
    private List<Long> artistId;
    private List<String> artistName;
    private List<String> artistImgPath;
    private String releaseDt;
    private String albumTitle;
    private String albumImgPath;
    private String videoId;
    private String lyrics;
    private Integer likeCnt;
}
