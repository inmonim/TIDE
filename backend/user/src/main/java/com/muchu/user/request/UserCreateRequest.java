package com.muchu.user.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class UserCreateRequest {

    private String email;
    private String password;
    private String nickname;
    private Date birth;
    private Integer gender;

}
