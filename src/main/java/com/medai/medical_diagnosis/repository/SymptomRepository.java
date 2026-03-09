package com.medai.medical_diagnosis.repository;

import com.medai.medical_diagnosis.model.SymptomCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SymptomRepository extends JpaRepository<SymptomCheck, Long> {

    @org.springframework.data.jpa.repository.Query("SELECT s FROM SymptomCheck s JOIN FETCH s.user WHERE s.user.email = :email")
    java.util.List<SymptomCheck> findByUserEmail(String email);
}
