package com.onlineexam.services;

import com.onlineexam.entities.Quizzes;
import java.util.List;

public interface QuizzesService {
    Quizzes AddQuiz(Quizzes quizzes);
    List<Quizzes> getAllQuizzes();
    Quizzes findById(Long Id);
    Quizzes updateQuiz(Long id, Quizzes quizDetails);
    void deleteQuiz(Long id);
}