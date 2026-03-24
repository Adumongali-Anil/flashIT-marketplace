package org.jain.stallsspringboot.service;

import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class EmailService {

    public void sendOtp(String email, String otp) {

        try {

            URL url = new URL("https://api.resend.com/emails");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + System.getenv("RESEND_API_KEY"));
            conn.setRequestProperty("Content-Type", "application/json");

            conn.setDoOutput(true);

            String json = "{"
                    + "\"from\":\"onboarding@resend.dev\","
                    + "\"to\":\"" + email + "\","
                    + "\"subject\":\"Marketplace OTP\","
                    + "\"html\":\"<h2>Your OTP is: " + otp + "</h2>"
                    + "<p>This OTP is valid for 5 minutes.</p>\""
                    + "}";

            OutputStream os = conn.getOutputStream();
            os.write(json.getBytes());
            os.flush();
            os.close();

            int responseCode = conn.getResponseCode();

            System.out.println("✅ Email sent! Response Code: " + responseCode);

        } catch (Exception e) {
            System.out.println("❌ Email sending failed");
            e.printStackTrace();
        }
    }
}