package org.jain.stallsspringboot.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "djvuusvh0",
            "api_key", "986455316219554",
            "api_secret", "LJbt8trNXFNJtk5qvcWVQXdWzCU"
        ));
    }
}