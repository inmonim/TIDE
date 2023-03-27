package com.muchu.user.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseFollow {

    private String nickname;
    private String introduce;
    private String profile_img_path;

}
