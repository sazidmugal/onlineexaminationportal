package com.onlineexam.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineexam.entities.Questions;
import com.onlineexam.exceptions.NotFoundException;
import com.onlineexam.repository.QuestionRepository;
import com.onlineexam.services.QuestionService;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Questions AddQuestion(Questions questions) {
        return this.questionRepository.save(questions);
    }

    @Override
    public List<Questions> getQuizzes() {
        return this.questionRepository.findAll();
    }

    @Override
    public Questions findQuestionById(Long Id) {
        return this.questionRepository.findById(Id)
                .orElseThrow(() -> new NotFoundException("Question with ID " + Id + " not found"));
    }

    @Override
    public List<Questions> getQuestionsByQuizId(Long quizId) {
        return this.questionRepository.findByQuizId(quizId);
    }

    @Override
    public Questions updateQuestion(Long id, Questions questionDetails) {
        Questions existingQuestion = findQuestionById(id);
        
        // Match the getter and setter used in Questions.java
        existingQuestion.setQuestionTitle(questionDetails.getQuestionTitle());
        existingQuestion.setOption1(questionDetails.getOption1());
        existingQuestion.setOption2(questionDetails.getOption2());
        existingQuestion.setOption3(questionDetails.getOption3());
        existingQuestion.setOption4(questionDetails.getOption4());
        existingQuestion.setRightAnswer(questionDetails.getRightAnswer());

        return this.questionRepository.save(existingQuestion);
    }

    @Override
    public void deleteQuestion(Long id) {
        Questions existingQuestion = findQuestionById(id);
        this.questionRepository.delete(existingQuestion);
    }
}