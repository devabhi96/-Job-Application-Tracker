package com.devAbhi.resumeTracker.service;

import com.devAbhi.resumeTracker.entity.ApplicationEntity;
import com.devAbhi.resumeTracker.entity.ApplicationStatus;
import com.devAbhi.resumeTracker.entity.UserEntity; // <-- Fixed to use your exact class
import com.devAbhi.resumeTracker.repository.ApplicationRepository;
import com.devAbhi.resumeTracker.repository.UserRepository; // Assuming you have this!
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ApplicationEntity> getAllApplications(){
        return applicationRepository.findAll();
    }

    public ApplicationEntity getApplicationById(Long id){
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application Not Found " + id));
    }

    public List<ApplicationEntity> getApplicationsByStatus(ApplicationStatus status){
        return applicationRepository.findByStatus(status);
    }

    // --- Fixed Method ---
    public ApplicationEntity createApplication(ApplicationEntity application, String username){
        // Changed "User" to "UserEntity"
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Attach the UserEntity to the application before saving
        application.setUser(user);

        return applicationRepository.save(application);
    }

    public ApplicationEntity updateApplication(Long id, ApplicationEntity updated){
        ApplicationEntity existing = getApplicationById(id);
        existing.setCompany(updated.getCompany());
        existing.setJobTitle(updated.getJobTitle());
        existing.setStatus(updated.getStatus());
        existing.setDateApplied(updated.getDateApplied());
        existing.setJobUrl(updated.getJobUrl());
        existing.setNotes(updated.getNotes());
        return applicationRepository.save(existing);
    }

    public void deleteApplication(Long id){
        applicationRepository.deleteById(id);
    }
}