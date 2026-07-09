package com.devAbhi.resumeTracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "applications")
public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message ="Company name is required")
    private String company;

    @NotBlank(message ="Job title is required")
    private String jobTitle;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private LocalDate dateApplied;

    private String jobUrl;

    @Column(length = 2000)
    private String notes;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserEntity user;
}