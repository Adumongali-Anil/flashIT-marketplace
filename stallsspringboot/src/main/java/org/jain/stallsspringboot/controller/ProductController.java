package org.jain.stallsspringboot.controller;

import org.jain.stallsspringboot.entity.Product;
import org.springframework.web.multipart.MultipartFile;
import org.jain.stallsspringboot.repository.ProductRepository;
import org.jain.stallsspringboot.repository.StallRepository;
import org.jain.stallsspringboot.service.ProductService;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private Cloudinary cloudinary;

    // ================= UPLOAD METHOD =================
    public String uploadImage(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.emptyMap()
        );
        return uploadResult.get("secure_url").toString();
    }

    // ================= CREATE PRODUCT =================
    @PostMapping("/vendor/create/{stallId}")
    public Product createProduct(
            @PathVariable Long stallId,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam("image") MultipartFile file
    ) throws Exception {

        String imageUrl = uploadImage(file);

        Product product = productService.createProduct(
                stallId,
                name,
                description,
                price,
                stock
        );

        product.setImageUrl(imageUrl);

        return productRepository.save(product);
    }

    // ================= VENDOR PRODUCTS =================
    @GetMapping("/vendor/my-products")
    public List<Product> getMyProducts(Authentication authentication) {
        String username = authentication.getName();
        return productRepository.findByStallUserUsernameAndActiveTrue(username);
    }

    // ================= CUSTOMER PRODUCTS =================
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findByActiveTrue();
    }

    // ================= UPDATE PRODUCT =================
    @PutMapping("/vendor/update/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam(value = "image", required = false) MultipartFile file,
            Authentication authentication
    ) throws Exception {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        String username = authentication.getName();

        if (!product.getStall().getUser().getUsername().equals(username)) {
            throw new RuntimeException("Not allowed");
        }

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);

        if (file != null && !file.isEmpty()) {
            String imageUrl = uploadImage(file);
            product.setImageUrl(imageUrl);
        }

        return productRepository.save(product);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // ================= DELETE =================
    @DeleteMapping("/vendor/delete/{id}")
    public String deleteProduct(@PathVariable Long id, Authentication authentication) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        String username = authentication.getName();

        if (!product.getStall().getUser().getUsername().equals(username)) {
            throw new RuntimeException("Not allowed");
        }

        product.setActive(false);
        productRepository.save(product);

        return "Product disabled successfully";
    }
}