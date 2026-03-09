package com.medai.medical_diagnosis.controller;

import com.medai.medical_diagnosis.model.User;
import com.medai.medical_diagnosis.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public AuthController(UserRepository repository,
            PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }

    @GetMapping("/user")
    public org.springframework.security.core.Authentication user(
            org.springframework.security.core.Authentication authentication) {
        return authentication;
    }
}
