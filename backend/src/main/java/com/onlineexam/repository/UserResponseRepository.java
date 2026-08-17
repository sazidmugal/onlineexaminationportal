package com.onlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineexam.entities.UserResponses;

public interface UserResponseRepository extends JpaRepository<UserResponses, Long> {
}
