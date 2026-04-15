package org.jain.stallsspringboot.controller;

import java.util.List;
import java.util.Map;

import org.jain.stallsspringboot.entity.Product;
import org.jain.stallsspringboot.entity.Stalls;
import org.jain.stallsspringboot.entity.User;
import org.jain.stallsspringboot.repository.ProductRepository;
import org.jain.stallsspringboot.repository.StallRepository;
import org.jain.stallsspringboot.repository.UserRepository;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

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

    /* ================= ADMIN ================= */

    @GetMapping("/admin/all-stalls")
    public List<Stalls> getAllStalls() {
        return stallRepository.findAll();
    }

    /* ================= CUSTOMER ================= */

    @GetMapping("/customer")
    public List<Stalls> getAllStallsForCustomer() {
        return stallRepository.findAll();
    }

    /* ================= STALL PRODUCTS ================= */

    @GetMapping("/{stallId}/products")
    public List<Product> getProductsByStall(@PathVariable Long stallId) {
        return productRepository.findByStallIdAndActiveTrue(stallId);
    }

    /* ================= VENDOR ================= */

    @GetMapping("/vendor/my-stalls")
    public List<Stalls> getMyStalls(Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        String username = authentication.getName();

        return stallRepository.findByUserUsername(username);
    }

    /* ================= CREATE ================= */

    @PostMapping("/vendor/create")
    public Stalls createStall(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam MultipartFile image,
            Authentication authentication
    ) throws Exception {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow();

        // ✅ CLOUDINARY UPLOAD
        String imageUrl = uploadImage(image);

        Stalls stall = new Stalls();
        stall.setName(name);
        stall.setDescription(description);
        stall.setLocation(location);
        stall.setImageUrl(imageUrl);
        stall.setUser(user);

        return stallRepository.save(stall);
    }

    /* ================= UPDATE ================= */

    @PutMapping("/vendor/update/{id}")
    public Stalls updateStall(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam(required = false) MultipartFile image,
            Authentication authentication
    ) throws Exception {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        Stalls existing = stallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        String username = authentication.getName();

        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !existing.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Not allowed");
        }

        existing.setName(name);
        existing.setDescription(description);
        existing.setLocation(location);

        // ✅ UPDATE IMAGE (ONLY IF NEW IMAGE PROVIDED)
        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadImage(image);
            existing.setImageUrl(imageUrl);
        }

        return stallRepository.save(existing);
    }

    /* ================= DELETE ================= */

    @DeleteMapping("/vendor/delete/{id}")
    public String deleteStall(@PathVariable Long id, Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        Stalls existing = stallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        String username = authentication.getName();

        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            if (existing.getUser() == null ||
                    !existing.getUser().getUsername().equals(username)) {

                throw new RuntimeException("You are not allowed to delete this stall");
            }
        }

        stallRepository.delete(existing);

        return "Stall deleted successfully";
    }
}