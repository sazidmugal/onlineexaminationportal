package com.onlineexam.services;

import java.util.List;

import com.onlineexam.entities.UserResponses;

public interface UserResponseService {
    UserResponses AddResponse(UserResponses userResponses);
    List<UserResponses> getAllResponse();
    UserResponses findById(Long Id);
}
