package com.onlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineexam.entities.Quizzes;

public interface QuizzesRepository extends JpaRepository<Quizzes, Long> {

}
