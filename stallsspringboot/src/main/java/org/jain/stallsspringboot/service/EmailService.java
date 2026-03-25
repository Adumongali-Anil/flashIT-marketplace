package org.jain.stallsspringboot.service;

import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class EmailService {

    public void sendOtp(String email, String otp) {

        try {

            URL url = new URL("https://api.brevo.com/v3/smtp/email");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("accept", "application/json");
            conn.setRequestProperty("api-key", System.getenv("BREVO_API_KEY"));
            conn.setRequestProperty("content-type", "application/json");

            conn.setDoOutput(true);

            String json = "{"
                    + "\"sender\":{\"email\":\"adumongalianilkumar@gmail.com\",\"name\":\"FlashIT\"},"
                    + "\"to\":[{\"email\":\"" + email + "\"}],"
                    + "\"subject\":\"🔐 OTP Verification\","
                    + "\"htmlContent\":\"<h2>Your OTP is: " + otp + "</h2><p>This OTP is valid for 5 minutes</p>\""
                    + "}";

            OutputStream os = conn.getOutputStream();
            os.write(json.getBytes());
            os.flush();
            os.close();

            int responseCode = conn.getResponseCode();

            System.out.println("✅ Email API Response Code: " + responseCode);

        } catch (Exception e) {
            System.out.println("❌ Email sending failed");
            e.printStackTrace();
        }
    }
}