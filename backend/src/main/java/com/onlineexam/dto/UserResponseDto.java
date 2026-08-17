package com.onlineexam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import com.onlineexam.entities.Quizzes;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDto {
    private Long ResponseID;
    private Long  AttemptId;
    private Long  QuestionId;
    private Long  OptionId;
}
