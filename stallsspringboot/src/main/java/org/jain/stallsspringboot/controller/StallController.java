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

    @PostMapping("/vendor/create")
    public Stalls createStall(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam MultipartFile image,
            Authentication authentication
    ) throws Exception {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        String imageUrl = uploadImage(image);

        Stalls stall = new Stalls();
        stall.setName(name);
        stall.setDescription(description);
        stall.setLocation(location);
        stall.setImageUrl(imageUrl);
        stall.setUser(user);

        return stallRepository.save(stall);
    }

    @PutMapping("/vendor/update/{id}")
    public Stalls updateStall(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam(required = false) MultipartFile image,
            Authentication authentication
    ) throws Exception {

        Stalls existing = stallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stall not found"));

        existing.setName(name);
        existing.setDescription(description);
        existing.setLocation(location);

        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadImage(image);
            existing.setImageUrl(imageUrl);
        }

        return stallRepository.save(existing);
    }
}