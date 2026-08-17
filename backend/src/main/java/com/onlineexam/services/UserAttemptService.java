package com.onlineexam.services;

import com.onlineexam.entities.UserAttempt;
import java.util.List;
import java.util.Map;

public interface UserAttemptService {
    UserAttempt addAttempt(UserAttempt attempt);
    List<UserAttempt> getAllAttempts();
    UserAttempt getAttemptById(Long id);
    List<UserAttempt> getAttemptsByUserId(Long userId);
    List<UserAttempt> getAttemptsByQuizId(Long quizId); // <-- Added this
    void deleteAttempt(Long id);
    Map<String, Object> getDashboardAnalytics();
}