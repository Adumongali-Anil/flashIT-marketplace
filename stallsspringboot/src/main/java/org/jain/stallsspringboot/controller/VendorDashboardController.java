package org.jain.stallsspringboot.controller;

import org.jain.stallsspringboot.repository.ProductRepository;
import org.jain.stallsspringboot.repository.StallRepository;
import org.jain.stallsspringboot.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/vendor/dashboard")
public class VendorDashboardController {

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private ProductRepository productRepository;

    // ✅ USE OrderItemRepository NOT OrderRepository
    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats(Authentication auth) {

        String username = auth.getName();

        long stalls =
                stallRepository.countByUserUsername(username);

        long products =
                productRepository
                        .countByStallUserUsernameAndActiveTrue(username);

        // ✅ GET ORDER COUNT FROM OrderItemRepository
        Long orders =
                orderItemRepository.countOrdersByVendor(username);

        // ✅ GET REVENUE FROM OrderItemRepository
        Double revenue =
                orderItemRepository.sumRevenueByVendor(username);

        Map<String, Object> data = new HashMap<>();

        data.put("stalls", stalls);
        data.put("products", products);
        data.put("orders", orders == null ? 0 : orders);
        data.put("revenue", revenue == null ? 0 : revenue);

        return data;
    }
}