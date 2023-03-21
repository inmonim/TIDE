package com.muchu.user.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoRequest {
    private String profile_img_path;
    private String introduce;
}
