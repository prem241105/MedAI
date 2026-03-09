package com.medai.medical_diagnosis.service;

import com.medai.medical_diagnosis.model.SymptomCheck;
import com.medai.medical_diagnosis.repository.SymptomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SymptomService {

    private final SymptomRepository repository;

    public SymptomService(SymptomRepository repository) {
        this.repository = repository;
    }

    public List<SymptomCheck> getAll() {
        return repository.findAll();
    }

    public List<SymptomCheck> getByUserEmail(String email) {
        return repository.findByUserEmail(email);
    }

    public SymptomCheck save(SymptomCheck check) {
        return repository.save(check);
    }
}
