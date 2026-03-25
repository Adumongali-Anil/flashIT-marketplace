package org.jain.stallsspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email, String otp) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(email);
            message.setSubject("🔐 flashIT Marketplace OTP Verification");

            message.setText(
                    "Hello User,\n\n" +
                    "Your OTP is: " + otp + "\n\n" +
                    "This OTP is valid for 5 minutes.\n\n" +
                    "Do not share this OTP.\n\n" +
                    "Regards,\nFlashIT Marketplace"
            );

            mailSender.send(message);

            System.out.println("✅ OTP EMAIL SENT SUCCESSFULLY");

        } catch (Exception e) {
            System.out.println("❌ EMAIL FAILED");
            e.printStackTrace();
        }
    }
}