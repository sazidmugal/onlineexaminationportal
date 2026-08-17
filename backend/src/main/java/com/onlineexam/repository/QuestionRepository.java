package com.onlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.onlineexam.entities.Questions;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Questions, Long> {

    @Query(value = "SELECT * FROM questions WHERE quiz_id = :quizId", nativeQuery = true)
    List<Questions> findByQuizId(@Param("quizId") Long quizId);

}