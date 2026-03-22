
package org.jain.stallsspringboot.repository;

import java.util.List;

import org.jain.stallsspringboot.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserUsername(String username);
    
    
}