package com.muchu.user.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class ResponseMyDiary {
    private String title;
    private String content;
    private Date create_dt;
    private Integer like;
}
