package com.onlineexam.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineexam.entities.UserAttempt;
import com.onlineexam.exceptions.NotFoundException;
import com.onlineexam.repository.UserAttemptRepository;
import com.onlineexam.services.UserAttemptService;

import java.util.List;
import java.util.Map;

@Service
public class UserAttemptServiceImpl implements UserAttemptService {

    @Autowired
    private UserAttemptRepository userAttemptRepository;

    @Override
    public UserAttempt addAttempt(UserAttempt attempt) {
        return this.userAttemptRepository.save(attempt);
    }

    @Override
    public List<UserAttempt> getAllAttempts() {
        return this.userAttemptRepository.findAll();
    }

    @Override
    public UserAttempt getAttemptById(Long id) {
        return this.userAttemptRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User attempt with ID " + id + " not found"));
    }

    @Override
    public List<UserAttempt> getAttemptsByUserId(Long userId) {
        return this.userAttemptRepository.findAttemptsByUserId(userId);
    }

    @Override
    public List<UserAttempt> getAttemptsByQuizId(Long quizId) {
        return this.userAttemptRepository.findAttemptsByQuizId(quizId);
    }

    @Override
    public void deleteAttempt(Long id) {
        UserAttempt attempt = getAttemptById(id);
        this.userAttemptRepository.delete(attempt);
    }

    @Override
    public Map<String, Object> getDashboardAnalytics() {
        return null;
    }
}