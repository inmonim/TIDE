package com.muchu.user.service.profile;

import com.muchu.user.request.UserInfoRequest;
import com.muchu.user.response.ResponseProfile;

public interface ProfileService {
    ResponseProfile infoUser(String email);
    UserInfoRequest updateInfo(UserInfoRequest request, String email);
    void deleteInfo(String email);
    ResponseProfile getUserInfo(String nickname);
}
