package com.onlineexam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.onlineexam.entities.Options;
import com.onlineexam.entities.Questions;
import com.onlineexam.entities.Quizzes;

@Getter
@Setter
@AllArgsConstructor
public class QuestionDto {
    private Long QuestionID;

    private String QuestionText;

    private String QuestionType;

    private Quizzes quizzes;

    private List<Options> options;

    private Long QuizId;
}
