package com.tide.diary.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@NoArgsConstructor
public class RequestDiary {
    private String title;
    private String content;
    private String pub;
    private Long songId;
}
