package com.onlineexam.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import com.onlineexam.entities.Quizzes;

@Getter
@Setter
@AllArgsConstructor
public class UserAttemptDto {
    private Long AttemptID;
    private Quizzes quizzes;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int score;
    private  Long QuizID;
}
