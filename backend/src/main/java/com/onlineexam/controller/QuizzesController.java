package com.onlineexam.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.onlineexam.dto.QuizzesDto;
import com.onlineexam.entities.Quizzes;
import com.onlineexam.services.QuizzesService;

import java.util.List;

@RestController
@RequestMapping("/api/Quizzes")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class QuizzesController {

    @Autowired
    private QuizzesService quizzesService;
    
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<Quizzes> SaveQuizzes(@RequestBody QuizzesDto quizzesDto){
        Quizzes quizzes = modelMapper.map(quizzesDto, Quizzes.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.quizzesService.AddQuiz(quizzes));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<List<Quizzes>> fetchQuizzes(){
        return ResponseEntity.ok(this.quizzesService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<Quizzes> getQuizById(@PathVariable Long id) {
        Quizzes quiz = this.quizzesService.findById(id);
        return ResponseEntity.ok(quiz);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<Quizzes> updateQuiz(@PathVariable Long id, @RequestBody QuizzesDto quizzesDto) {
        Quizzes quiz = modelMapper.map(quizzesDto, Quizzes.class);
        return ResponseEntity.ok(this.quizzesService.updateQuiz(id, quiz));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long id) {
        this.quizzesService.deleteQuiz(id);
        return ResponseEntity.ok("Quiz deleted successfully");
    }
}