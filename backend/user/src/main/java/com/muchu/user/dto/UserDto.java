package com.muchu.user.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class UserDto {

    private String email;
    private String password;
    private String nickname;
    private Date birth;
    private Integer gender;


//    private List<> profile;
}
