package org.jain.stallsspringboot.service;

import org.jain.stallsspringboot.entity.Stalls; // or Stall if renamed
import org.jain.stallsspringboot.repository.StallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StallService {

    @Autowired
    private StallRepository stallRepository;

    public void saveDetails(Stalls stalls) {
        stallRepository.save(stalls);
    }
}