package com.tide.music.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ResponseSearchSong {
    private Long songId;
    private String title;
    private List<String> artist;
    private String albumImgPath;
    private String videoId;
}
