package com.muchu.user.dto;

import com.muchu.user.response.ResponseProfile;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class UserDto {

    private String email;
    private String password;
    private String nickname;
    private Date birth;
    private Integer gender;

    private List<ResponseProfile> profile;
}
