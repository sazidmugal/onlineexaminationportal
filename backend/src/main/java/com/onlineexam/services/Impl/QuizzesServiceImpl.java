package com.onlineexam.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlineexam.entities.Quizzes;
import com.onlineexam.entities.Questions;
import com.onlineexam.exceptions.NotFoundException;
import com.onlineexam.repository.QuizzesRepository;
import com.onlineexam.services.QuizzesService;

import java.util.List;

@Service
@Transactional // Required for cascade saves and collection management
public class QuizzesServiceImpl implements QuizzesService {

    @Autowired
    private QuizzesRepository quizzesRepository;

    @Override
    public Quizzes AddQuiz(Quizzes quizzes) {
        if (quizzes.getQuestions() != null) {
            for (Questions question : quizzes.getQuestions()) {
                question.setQuizzes(quizzes);
            }
        }
        return this.quizzesRepository.save(quizzes);
    }

    @Override
    public List<Quizzes> getAllQuizzes() {
        return this.quizzesRepository.findAll();
    }

    @Override
    public Quizzes findById(Long Id) {
        return this.quizzesRepository.findById(Id)
                .orElseThrow(() -> new NotFoundException("Quiz With ID " + Id + " Not Found"));
    }

    @Override
    public Quizzes updateQuiz(Long id, Quizzes quizDetails) {
        Quizzes existingQuiz = findById(id);
        
        // Update all metadata fields explicitly
        existingQuiz.setTitle(quizDetails.getTitle());
        existingQuiz.setDescription(quizDetails.getDescription());
        existingQuiz.setCategory(quizDetails.getCategory());

        // Manage child questions cleanly
        if (quizDetails.getQuestions() != null) {
            existingQuiz.getQuestions().clear();
            for (Questions q : quizDetails.getQuestions()) {
                q.setQuizzes(existingQuiz);
                existingQuiz.getQuestions().add(q);
            }
        }

        return this.quizzesRepository.save(existingQuiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        Quizzes existingQuiz = findById(id);
        this.quizzesRepository.delete(existingQuiz);
    }
}