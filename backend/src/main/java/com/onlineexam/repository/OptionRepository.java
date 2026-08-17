package com.onlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.onlineexam.entities.Options;
import java.util.List;

public interface OptionRepository extends JpaRepository<Options, Long> {

    // Clean derived query: maps to options -> questions -> questionId
    List<Options> findByQuestions_QuestionId(Long questionId);

}