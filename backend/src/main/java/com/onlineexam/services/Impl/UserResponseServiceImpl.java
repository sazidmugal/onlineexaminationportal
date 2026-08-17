package com.onlineexam.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineexam.entities.UserResponses;
import com.onlineexam.exceptions.NotFoundException;
import com.onlineexam.repository.UserResponseRepository;
import com.onlineexam.services.UserResponseService;

import java.util.List;

@Service
public class UserResponseServiceImpl implements UserResponseService {

    @Autowired
    private UserResponseRepository userResponseRepository;

    @Override
    public UserResponses AddResponse(UserResponses userResponses) {
        return this.userResponseRepository.save(userResponses);
    }

    @Override
    public List<UserResponses> getAllResponse() {
        return this.userResponseRepository.findAll();
    }

    @Override
    public UserResponses findById(Long id) {
        return this.userResponseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User Response with ID " + id + " not found"));
    }
}