package com.devAbhi.resumeTracker.controller;


import com.devAbhi.resumeTracker.entity.ApplicationEntity;
import com.devAbhi.resumeTracker.entity.ApplicationStatus;
import com.devAbhi.resumeTracker.service.ApplicationService;
import jdk.jshell.Snippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping
    public List<ApplicationEntity> getApplications(
        @RequestParam(required = false) ApplicationStatus status){
    if(status != null){
        return applicationService.getApplicationsByStatus(status);
    }
    return applicationService.getAllApplications();
        }

        @GetMapping("/{id}")
    public ApplicationEntity getApplication(@PathVariable Long id){
        return applicationService.getApplicationById(id);
    }

    @PostMapping
    public ApplicationEntity createApplication(@RequestBody ApplicationEntity applicationEntity){
        return applicationService.createApplication(applicationEntity);
    }

    @PutMapping("/{id}")
    public ApplicationEntity updateApplication(@PathVariable Long id, @RequestBody ApplicationEntity applicationEntity){
        return applicationService.updateApplication(id, applicationEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Long id){
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

}
