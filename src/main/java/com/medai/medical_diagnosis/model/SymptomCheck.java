package com.medai.medical_diagnosis.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "symptom_checks")
public class SymptomCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String symptoms;
    private String diagnosis;
    private String medicine;
    private String prevention;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
