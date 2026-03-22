package org.jain.stallsspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email, String otp){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("🔐 Marketplace Registration OTP");

        message.setText(
            "Hello User,\n\n" +
            "Your OTP for registration is: " + otp + "\n\n" +
            "This OTP is valid for 5 minutes.\n\n" +
            "Do not share this OTP with anyone.\n\n" +
            "Regards,\nMarketplace Team"
        );

        mailSender.send(message);
    }
}