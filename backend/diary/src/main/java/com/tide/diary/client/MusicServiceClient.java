package com.tide.diary.client;

import com.tide.diary.response.ResponseSearchSong;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

//@FeignClient
public interface MusicServiceClient {
//    @PostMapping
//    List<ResponseSearchSong> getDiarySongs(@Request)
}
