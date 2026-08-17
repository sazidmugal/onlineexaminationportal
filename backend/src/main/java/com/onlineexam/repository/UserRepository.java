package com.onlineexam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineexam.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String username);
}
