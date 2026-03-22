package org.jain.stallsspringboot.repository;

import java.util.List;

import org.jain.stallsspringboot.entity.Stalls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StallRepository extends JpaRepository<Stalls, Long> {
	
	
	

	List<Stalls> findByUserUsername(String username);
	long countByUserUsername(String username);
	
	

	

}
