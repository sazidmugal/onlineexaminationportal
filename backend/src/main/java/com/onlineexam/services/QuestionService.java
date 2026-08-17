package com.onlineexam.services;

import com.onlineexam.entities.Questions;
import java.util.List;

public interface QuestionService {
    Questions AddQuestion(Questions questions);
    List<Questions> getQuizzes();
    Questions findQuestionById(Long Id);
    List<Questions> getQuestionsByQuizId(Long quizId);
    Questions updateQuestion(Long id, Questions questionDetails);
    void deleteQuestion(Long id);
}