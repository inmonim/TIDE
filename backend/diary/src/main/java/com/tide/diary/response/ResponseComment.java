package com.tide.diary.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class ResponseComment {
    private Long id;
    private String comment;
    private String nickname;
    private Date createDt;
}
