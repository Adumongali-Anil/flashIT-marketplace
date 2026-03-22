package org.jain.stallsspringboot.controller;

import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount) throws Exception {

        RazorpayClient client =
                new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();

        options.put("amount", amount * 100); // paise
        options.put("currency", "INR");
        options.put("receipt", "txn_123");

        Order order = client.orders.create(options);

        return order.toString();
    }
}