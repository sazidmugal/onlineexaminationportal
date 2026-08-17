package com.onlineexam.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.onlineexam.dto.QuestionDto;

import com.onlineexam.entities.Questions;
import com.onlineexam.services.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<Questions> saveQuestion(@RequestBody QuestionDto questionsDto) {
        Questions question = modelMapper.map(questionsDto, Questions.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.questionService.AddQuestion(question));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<List<Questions>> fetchAllQuestions() {
        return ResponseEntity.ok(this.questionService.getQuizzes());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<Questions> getQuestionById(@PathVariable Long id) {
        Questions question = this.questionService.findQuestionById(id);
        return ResponseEntity.ok(question);
    }

    @GetMapping("/quiz/{quizId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<List<Questions>> getQuestionsByQuizId(@PathVariable Long quizId) {
        return ResponseEntity.ok(this.questionService.getQuestionsByQuizId(quizId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<Questions> updateQuestion(@PathVariable Long id, @RequestBody QuestionDto questionsDto) {
        Questions question = modelMapper.map(questionsDto, Questions.class);
        return ResponseEntity.ok(this.questionService.updateQuestion(id, question));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        this.questionService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted successfully");
    }
}