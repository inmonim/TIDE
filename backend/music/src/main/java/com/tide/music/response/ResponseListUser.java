package com.tide.music.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ResponseListUser {
    private Long playlistId;
    private String playlistTitle;
    private String nickname;
    private Integer likecnt;
}
