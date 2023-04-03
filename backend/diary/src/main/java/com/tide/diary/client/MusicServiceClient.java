package com.tide.diary.client;

import com.tide.diary.response.ResponseSearchSong;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "api-music")
public interface MusicServiceClient {

    @GetMapping("/getsonginfo")
    ResponseSearchSong getSongInfo(@RequestParam("songId") Long songId);

}
