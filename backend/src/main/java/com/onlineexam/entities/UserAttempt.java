package com.onlineexam.entities;

import com.fasterxml.jackson.annotation.JsonIgnore; // Import added
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long AttemptID;

    @ManyToOne()
    @JoinColumn(name = "QuizID")
    @JsonIgnore // <-- Stops infinite JSON recursion loop
    private Quizzes quizzes;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int score;
}