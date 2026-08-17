package com.onlineexam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.onlineexam.Util.JwtUtil;
import com.onlineexam.dto.AuthRequestDto;
import com.onlineexam.entities.User;
import com.onlineexam.repository.UserRepository;
import com.onlineexam.services.Impl.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserRepository userRepository; // Direct DB access to get exact role string

    @Autowired
    private JwtUtil jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody User userInfo) {
        return userService.addUser(userInfo);
    }

    @PostMapping(value="/signing", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequestDto authRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequestDto.getName(), authRequestDto.getPassword())
        );
        
        if (authentication.isAuthenticated()) {
            Map<String, Object> response = new HashMap<>();
            
            // 1. Generate JWT Token
            String token = jwtService.generateToken(authRequestDto.getName());
            
            // 2. Direct fetch from UserRepository to avoid missing service methods
            User user = userRepository.findByName(authRequestDto.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + authRequestDto.getName()));

            response.put("token", token);
            response.put("role", user.getRoles()); // Returns "ROLE_ADMIN" straight from DB

            return ResponseEntity.ok(response);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}