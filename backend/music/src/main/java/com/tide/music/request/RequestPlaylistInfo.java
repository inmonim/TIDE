package com.tide.music.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class RequestPlaylistInfo {
    private Long playlistId;
    private String playlistTitle;
    private String isPublic;
}
