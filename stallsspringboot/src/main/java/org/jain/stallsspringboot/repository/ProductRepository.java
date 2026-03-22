package org.jain.stallsspringboot.repository;

import org.jain.stallsspringboot.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Vendor sees only their stall products
    List<Product> findByStallUserUsernameAndActiveTrue(String username);

    // Customer sees all active products
    List<Product> findByActiveTrue();

    // Soft delete
    List<Product> findByDeletedFalse();

    // Vendor dashboard count
    long countByStallUserUsernameAndActiveTrue(String username);

    // ⭐ GET PRODUCTS BY STALL (THIS FIXES YOUR ERROR)
    List<Product> findByStallIdAndActiveTrue(Long stallId);

}