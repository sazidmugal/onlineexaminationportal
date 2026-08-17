package com.onlineexam.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.onlineexam.entities.User;

@Service
public interface UserService extends UserDetailsService {
    UserDetails loadUserByUsername(String username);
    void saveUser(User user);


}
