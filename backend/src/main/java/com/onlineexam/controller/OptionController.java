package com.onlineexam.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.onlineexam.dto.OptionDto;
import com.onlineexam.entities.Options;
import com.onlineexam.services.OptionService;

import java.util.List;

@RestController
@RequestMapping("/api/options")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class OptionController {

    @Autowired
    private OptionService optionService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<Options> saveOption(@RequestBody OptionDto optionDto) {
        Options option = modelMapper.map(optionDto, Options.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.optionService.addOption(option));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<List<Options>> fetchAllOptions() {
        return ResponseEntity.ok(this.optionService.getAllOptions());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<Options> getOptionById(@PathVariable Long id) {
        Options option = this.optionService.findOptionById(id);
        return ResponseEntity.ok(option);
    }

    @GetMapping("/question/{questionId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER', 'ADMIN', 'USER')")
    public ResponseEntity<List<Options>> getOptionsByQuestionId(@PathVariable Long questionId) {
        return ResponseEntity.ok(this.optionService.getOptionsByQuestionId(questionId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<Options> updateOption(@PathVariable Long id, @RequestBody OptionDto optionDto) {
        Options option = modelMapper.map(optionDto, Options.class);
        return ResponseEntity.ok(this.optionService.updateOption(id, option));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<String> deleteOption(@PathVariable Long id) {
        this.optionService.deleteOption(id);
        return ResponseEntity.ok("Option deleted successfully");
    }
}