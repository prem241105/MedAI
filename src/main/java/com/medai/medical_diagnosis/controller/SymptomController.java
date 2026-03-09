package com.medai.medical_diagnosis.controller;

import com.medai.medical_diagnosis.model.SymptomCheck;
import com.medai.medical_diagnosis.model.User;
import com.medai.medical_diagnosis.service.SymptomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SymptomController {

    private final SymptomService service;
    private final com.medai.medical_diagnosis.repository.UserRepository userRepository;

    public SymptomController(SymptomService service,
            com.medai.medical_diagnosis.repository.UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @GetMapping("/symptom-history")
    public List<SymptomCheck> history(java.security.Principal principal) {
        if (principal == null)
            return List.of();
        return service.getByUserEmail(principal.getName());
    }

    @PostMapping("/symptom-check")
    public SymptomCheck save(@RequestBody SymptomCheck check, java.security.Principal principal) {
        if (principal == null)
            throw new RuntimeException("Not authenticated");
        User currentUser = userRepository.findByEmail(principal.getName()).orElseThrow();
        check.setUser(currentUser);
        return service.save(check);
    }
}
