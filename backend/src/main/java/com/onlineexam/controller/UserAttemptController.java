package com.onlineexam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.onlineexam.entities.UserAttempt;
import com.onlineexam.services.UserAttemptService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attempts")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class UserAttemptController {

    @Autowired
    private UserAttemptService userAttemptService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserAttempt>> getAllAttempts() {
        return ResponseEntity.ok(this.userAttemptService.getAllAttempts());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<UserAttempt> getAttemptById(@PathVariable Long id) {
        return ResponseEntity.ok(this.userAttemptService.getAttemptById(id));
    }

    @GetMapping("/quiz/{quizId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserAttempt>> getAttemptsByQuizId(@PathVariable Long quizId) {
        return ResponseEntity.ok(this.userAttemptService.getAttemptsByQuizId(quizId));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<List<UserAttempt>> getAttemptsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(this.userAttemptService.getAttemptsByUserId(userId));
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(this.userAttemptService.getDashboardAnalytics());
    }
}