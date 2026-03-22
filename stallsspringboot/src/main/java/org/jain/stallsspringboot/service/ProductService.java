package org.jain.stallsspringboot.service;

import org.jain.stallsspringboot.entity.Product;
import org.jain.stallsspringboot.entity.Stalls;
import org.jain.stallsspringboot.repository.ProductRepository;
import org.jain.stallsspringboot.repository.StallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StallRepository stallRepository;

    public Product createProduct(
            Long stallId,
            String name,
            String description,
            Double price,
            Integer stock
    ) {

        Stalls stall = stallRepository
                .findById(stallId)
                .orElseThrow(() ->
                        new RuntimeException("Stall not found"));

        Product product = new Product();

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setStall(stall);
        product.setVendor(stall.getUser());   // ADD THIS
        product.setActive(true);

        return productRepository.save(product);
    }}