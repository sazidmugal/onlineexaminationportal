package com.onlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.onlineexam.entities.UserAttempt;
import java.util.List;

public interface UserAttemptRepository extends JpaRepository<UserAttempt, Long> {

    @Query(value = "SELECT * FROM user_attempts WHERE user_id = :userId", nativeQuery = true)
    List<UserAttempt> findAttemptsByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM user_attempts WHERE quiz_id = :quizId", nativeQuery = true)
    List<UserAttempt> findAttemptsByQuizId(@Param("quizId") Long quizId);

}