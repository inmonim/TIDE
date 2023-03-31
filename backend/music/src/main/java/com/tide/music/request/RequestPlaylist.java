package com.tide.music.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestPlaylist {
    private String playListTitle;
    private String isPublic;
}
