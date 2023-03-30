package com.tide.diary.response;

import lombok.Data;
import lombok.NoArgsConstructor;

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

}
