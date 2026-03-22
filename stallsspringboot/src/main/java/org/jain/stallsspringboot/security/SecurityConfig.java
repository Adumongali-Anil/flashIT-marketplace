package org.jain.stallsspringboot.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

   @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .cors(cors -> {})
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .authorizeHttpRequests(auth -> auth

            // ✅ IMPORTANT FIX
            .requestMatchers("/", "/index.html").permitAll()

            .requestMatchers("/api/auth/**", "/api/payment/**","/uploads/**").permitAll()

            // STALLS
            .requestMatchers("/api/stalls/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/stalls/vendor/**").hasAnyRole("VENDOR","ADMIN")
            .requestMatchers("/api/stalls/customer").hasAnyRole("CUSTOMER","ADMIN")

            // PRODUCTS PUBLIC
            .requestMatchers("/api/stalls/*/products").permitAll()
            .requestMatchers("/api/products/**").permitAll()

            // CART
            .requestMatchers("/api/cart/**").hasRole("CUSTOMER")

            // ORDERS
            .requestMatchers("/api/orders/my-orders").hasRole("CUSTOMER")
            .requestMatchers("/api/orders/checkout").hasRole("CUSTOMER")
            .requestMatchers("/api/orders/vendor-orders").hasRole("VENDOR")
            .requestMatchers("/api/orders/vendor-revenue").hasRole("VENDOR")

            // ADMIN
            .requestMatchers("/api/admin/**").hasRole("ADMIN")

            .anyRequest().authenticated()
        );

    http.addFilterBefore(jwtFilter,
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
    "http://localhost:3000",
    "https://flashit-marketplace.onrender.com"
));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE","OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}