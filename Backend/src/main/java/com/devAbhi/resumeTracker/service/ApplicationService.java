package com.devAbhi.resumeTracker.service;

import com.devAbhi.resumeTracker.entity.ApplicationEntity;
import com.devAbhi.resumeTracker.entity.ApplicationStatus;
import com.devAbhi.resumeTracker.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

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

    public ApplicationEntity createApplication(ApplicationEntity application){
     return applicationRepository.save(application);
    }

    public ApplicationEntity updateApplication(Long id,ApplicationEntity updated){
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
