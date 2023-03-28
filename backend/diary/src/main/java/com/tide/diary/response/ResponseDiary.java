package com.tide.diary.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class ResponseDiary {
    private String title;
    private String content;
    private Date createDt;
    private String pub;
    private Integer like;

}
