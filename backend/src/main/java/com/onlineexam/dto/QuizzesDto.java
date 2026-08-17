package com.onlineexam.dto;

import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
public class QuizzesDto {
    private Long QuizID;

    private String Title;

    private String Description;

    private LocalTime TimeLimit;
}
