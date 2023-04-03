package com.tide.diary.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseTopDiary {
    private Long id;
    private String title;
    private String nickname;
    private String createDt;
    private Integer like;
}
