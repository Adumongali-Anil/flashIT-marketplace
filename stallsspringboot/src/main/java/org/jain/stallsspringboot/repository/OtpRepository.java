package org.jain.stallsspringboot.repository;

import java.util.Optional;

import org.jain.stallsspringboot.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<OtpVerification,Long>{

	Optional<OtpVerification> findTopByEmailOrderByIdDesc(String email);
}