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

            // ✅ VERY IMPORTANT (ALLOW FRONTEND FILES)
            .requestMatchers(
                "/",
                "/index.html",
                "/static/**",
                "/manifest.json",
                "/favicon.ico",
                "/**/*.js",
                "/**/*.css",
                "/**/*.png",
                "/**/*.jpg"
            ).permitAll()

            // AUTH
            .requestMatchers("/api/auth/**").permitAll()

            // PAYMENT + UPLOAD
            .requestMatchers("/api/payment/**", "/uploads/**").permitAll()

            // PRODUCTS PUBLIC
            .requestMatchers("/api/stalls/*/products").permitAll()
            .requestMatchers("/api/products/**").permitAll()

            // STALLS
            .requestMatchers("/api/stalls/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/stalls/vendor/**").hasAnyRole("VENDOR","ADMIN")
            .requestMatchers("/api/stalls/customer").hasAnyRole("CUSTOMER","ADMIN")

            // CART
            .requestMatchers("/api/cart/**").hasRole("CUSTOMER")

            // ORDERS
            .requestMatchers("/api/orders/**").authenticated()

            // ADMIN
            .requestMatchers("/api/admin/**").hasRole("ADMIN")

            // ✅ EVERYTHING ELSE PUBLIC (VERY IMPORTANT)
            .anyRequest().permitAll()
        );

    http.addFilterBefore(jwtFilter,
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
 @Bean
public CorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOriginPatterns(List.of("*"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setAllowCredentials(false);

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", configuration);

    return source;
}
}