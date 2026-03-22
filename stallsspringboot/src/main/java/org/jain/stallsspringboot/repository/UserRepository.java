package org.jain.stallsspringboot.repository;

import java.util.List;
import java.util.Optional;

import org.jain.stallsspringboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<User> findByRole(String role);

    long countByRole(String role);
    
    Optional<User> findByEmail(String email);
    
}