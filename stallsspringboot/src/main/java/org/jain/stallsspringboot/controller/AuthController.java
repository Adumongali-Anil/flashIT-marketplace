package org.jain.stallsspringboot.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;

import org.jain.stallsspringboot.dto.LoginRequest;
import org.jain.stallsspringboot.dto.RegisterRequest;
import org.jain.stallsspringboot.entity.OtpVerification;
import org.jain.stallsspringboot.entity.User;
import org.jain.stallsspringboot.repository.OtpRepository;
import org.jain.stallsspringboot.repository.UserRepository;
import org.jain.stallsspringboot.security.JwtUtil;
import org.jain.stallsspringboot.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationException;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    // SEND OTP
    @PostMapping("/send-otp")
    public Map<String,String> sendOtp(@RequestBody Map<String,String> request){

        String email = request.get("email");

        String otp = String.valueOf(new Random().nextInt(900000)+100000);

        OtpVerification otpEntity = new OtpVerification();

        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpEntity);

        // ✅ SEND REAL EMAIL
        emailService.sendOtp(email, otp);
        // System.out.println("OTP: " + otp);

        return Map.of("message","OTP sent to your email 📩");
    }
    
 // 📩 SEND OTP FOR FORGOT PASSWORD
    @PostMapping("/forgot-password/send-otp")
    public Map<String,String> sendOtpForgot(@RequestBody Map<String,String> request){

        String email = request.get("email");

        if(!userRepository.existsByEmail(email)){
            return Map.of("message","Email not registered");
        }

        String otp = String.valueOf(new Random().nextInt(900000)+100000);

        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpEntity);

        emailService.sendOtp(email, otp);

        return Map.of("message","OTP sent to your email 📩");
    }
 // 🔐 RESET PASSWORD
    @PostMapping("/forgot-password/reset")
    public Map<String,String> resetPassword(@RequestBody Map<String,String> request){

        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("password");

        Optional<OtpVerification> storedOtp =
            otpRepository.findTopByEmailOrderByIdDesc(email);

        if(storedOtp.isEmpty()){
            return Map.of("message","OTP not found");
        }

        if(!storedOtp.get().getOtp().equals(otp)){
            return Map.of("message","Invalid OTP");
        }

        if(storedOtp.get().getExpiryTime().isBefore(LocalDateTime.now())){
            return Map.of("message","OTP expired");
        }

        User user = userRepository.findByEmail(email).orElseThrow();

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        otpRepository.delete(storedOtp.get());

        return Map.of("message","Password reset successful ✅");
    }
    @GetMapping("/me")
    public Map<String, String> getCurrentUser(Principal principal) {

        String username = principal.getName(); // logged user

        Map<String, String> res = new HashMap<>();
        res.put("username", username);

        return res;
    }

    // REGISTER
    @PostMapping("/register")
    public Map<String,String> register(@RequestBody RegisterRequest request){

        if(userRepository.existsByUsername(request.getUsername()))
            return Map.of("message","Username already exists");

        if(userRepository.existsByEmail(request.getEmail()))
            return Map.of("message","Email already registered");

        Optional<OtpVerification> storedOtp =
        		otpRepository.findTopByEmailOrderByIdDesc(request.getEmail());

        if(storedOtp.isEmpty())
            return Map.of("message","Please click Send OTP first");

        if(!storedOtp.get().getOtp().equals(request.getOtp()))
            return Map.of("message","Invalid OTP");

        if(storedOtp.get().getExpiryTime().isBefore(LocalDateTime.now()))
            return Map.of("message","OTP expired");

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole()); // 👈 you want role selection
        user.setEnabled(true);

        userRepository.save(user);

        otpRepository.delete(storedOtp.get());

        return Map.of("message","Registration Successful");
    }

    // LOGIN
    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody LoginRequest request){

        String input = request.getUsername(); // can be username or email

        User user = userRepository.findByUsername(input)
                .orElseGet(() ->
                    userRepository.findByEmail(input).orElse(null)
                );

        if(user == null){
            throw new RuntimeException("Username or password is wrong");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(), // always use username internally
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new RuntimeException("Username or password is wrong");
        }

        String token = jwtUtil.generateToken(user);

        Map<String,Object> response = new HashMap<>();

        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("role", user.getRole());

        return response;
    }
}