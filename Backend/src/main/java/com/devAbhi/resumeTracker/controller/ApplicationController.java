package com.devAbhi.resumeTracker.controller;

import com.devAbhi.resumeTracker.entity.ApplicationEntity;
import com.devAbhi.resumeTracker.entity.ApplicationStatus;
import com.devAbhi.resumeTracker.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping
    public List<ApplicationEntity> getApplications(
            @RequestParam(required = false) ApplicationStatus status, Principal principal){
        if(status != null){
            return applicationService.getApplicationsByStatus(status, principal.getName());
        }
        return applicationService.getAllApplications(principal.getName());
    }

    @GetMapping("/{id}")
    public ApplicationEntity getApplication(@PathVariable Long id, Principal principal){
        return applicationService.getApplicationById(id, principal.getName());
    }

    // --- UPDATED POST METHOD ---
    @PostMapping
    public ApplicationEntity createApplication(@Valid @RequestBody ApplicationEntity applicationEntity, Principal principal){
        // Pass the username (from the JWT) to the service
        return applicationService.createApplication(applicationEntity, principal.getName());
    }

    @PutMapping("/{id}")
    public ApplicationEntity updateApplication(@PathVariable Long id, @RequestBody ApplicationEntity applicationEntity,Principal principal){
        return applicationService.updateApplication(id, applicationEntity, principal.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Long id,Principal principal){
        applicationService.deleteApplication(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}