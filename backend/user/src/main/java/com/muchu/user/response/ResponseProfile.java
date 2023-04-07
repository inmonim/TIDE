package com.muchu.user.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseProfile {
    private Long userid;
    private String profile_img_path;
    private String introduce;
    private int point;
    private Integer gender;
    private String nickname;

}
