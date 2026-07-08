package com.devAbhi.resumeTracker.repository;

import com.devAbhi.resumeTracker.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
Optional<UserEntity> findByUsername(String username);

}
