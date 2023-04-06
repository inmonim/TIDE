package com.tide.diary.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ResponseDiary {
    private Long id;
    private String nickname;
    private String title;
    private String content;
    private String createDt;
    private String pub;
    private Integer like;
    private Long songId;
    private String musicTitle;
    private List<String> artist;
    private String albumImgPath;
    private String videoId;
}
