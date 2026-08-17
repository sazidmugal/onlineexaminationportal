package com.onlineexam.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.onlineexam.dto.UserResponseDto;
import com.onlineexam.entities.Options;
import com.onlineexam.entities.Questions;
import com.onlineexam.entities.UserAttempt;
import com.onlineexam.entities.UserResponses;
import com.onlineexam.services.OptionService;
import com.onlineexam.services.QuestionService;
import com.onlineexam.services.UserAttemptService;
import com.onlineexam.services.UserResponseService;

import java.util.List;

@RestController
@RequestMapping("/api/response")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class UserResponseController {

    @Autowired
    private OptionService optionService;

    @Autowired
    private UserAttemptService userAttemptService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserResponseService userResponseService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<UserResponses> addUserResponse(@RequestBody UserResponseDto userResponseDto) {
        UserResponses userResponses = this.modelMapper.map(userResponseDto, UserResponses.class);

        Questions existingQuestion = this.questionService.findQuestionById(userResponseDto.getQuestionId());
        UserAttempt existingAttempt = this.userAttemptService.getAttemptById(userResponseDto.getAttemptId());
        Options existingOption = this.optionService.findOptionById(userResponseDto.getOptionId());

        userResponses.setQuestion(existingQuestion);
        userResponses.setAttempt(existingAttempt);
        userResponses.setSelectedOption(existingOption);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.userResponseService.AddResponse(userResponses));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserResponses>> getAllResponses() {
        return ResponseEntity.ok(this.userResponseService.getAllResponse());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<UserResponses> getResponseById(@PathVariable Long id) {
        return ResponseEntity.ok(this.userResponseService.findById(id));
    }
}