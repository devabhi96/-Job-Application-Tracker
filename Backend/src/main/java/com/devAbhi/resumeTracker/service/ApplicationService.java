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

    public List<ApplicationEntity> getAllApplications(String username){
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByUser(user);
    }

    public ApplicationEntity getApplicationById(Long id, String username){
        ApplicationEntity app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application Not Found " + id));

        if (!app.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Not authorized to view this application");
        }
        return app;
    }

    public List<ApplicationEntity> getApplicationsByStatus(ApplicationStatus status,String username){
       UserEntity user = userRepository.findByUsername(username)
               .orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByStatusAndUser(status,user);
    }


    public ApplicationEntity createApplication(ApplicationEntity application, String username){

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        application.setUser(user);

        return applicationRepository.save(application);
    }

    public ApplicationEntity updateApplication(Long id, ApplicationEntity updated,String username){
        ApplicationEntity existing = getApplicationById(id,username);
        existing.setCompany(updated.getCompany());
        existing.setJobTitle(updated.getJobTitle());
        existing.setStatus(updated.getStatus());
        existing.setDateApplied(updated.getDateApplied());
        existing.setJobUrl(updated.getJobUrl());
        existing.setNotes(updated.getNotes());
        return applicationRepository.save(existing);
    }

    public void deleteApplication(Long id,String username){
        ApplicationEntity existing = getApplicationById(id,username);
        applicationRepository.delete(existing);
    }
}