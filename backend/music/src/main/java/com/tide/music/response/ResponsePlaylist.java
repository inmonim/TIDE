package com.tide.music.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponsePlaylist {
    private Long id;
    private String playlistTitle;
    private String isPublic;
}
