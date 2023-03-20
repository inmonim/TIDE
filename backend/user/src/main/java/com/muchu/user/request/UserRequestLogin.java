package com.muchu.user.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRequestLogin {

    private String email;
    private String password;
}
