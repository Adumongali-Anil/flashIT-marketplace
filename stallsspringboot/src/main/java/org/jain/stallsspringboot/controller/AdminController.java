package org.jain.stallsspringboot.controller;

import org.jain.stallsspringboot.entity.*;
import java.util.Optional;
import org.jain.stallsspringboot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @GetMapping("/summary")
    public Map<String, Object> getAdminSummary() {

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalUsers", userRepository.count());
        summary.put("totalVendors", userRepository.countByRole("VENDOR"));
        summary.put("totalCustomers", userRepository.countByRole("CUSTOMER"));
        summary.put("totalStalls", stallRepository.count());
        summary.put("totalProducts", productRepository.count());
        summary.put("totalOrders", orderRepository.count());

        /* ===== CALCULATE PLATFORM REVENUE ===== */

        List<OrderItem> items = orderItemRepository.findAll();

        double totalRevenue = 0;

        for (OrderItem item : items) {

            double amount = item.getPrice() * item.getQuantity();
            double commission = amount * 0.10;

            totalRevenue += commission;
        }

        summary.put("totalRevenue", totalRevenue);

        return summary;
    }

    // 1️⃣ View All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2️⃣ View All Stalls
    @GetMapping("/stalls")
    public List<Stalls> getAllStalls() {
        return stallRepository.findAll();
    }

    // 3️⃣ View All Products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findByDeletedFalse();
    }

    // 4️⃣ View All Orders
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    @GetMapping("/customers")
    public List<User> getCustomers() {
        return userRepository.findByRole("CUSTOMER");
    }
    
    @GetMapping("/vendors")
    public List<User> getVendors() {
        return userRepository.findByRole("VENDOR");
    }
    
    @GetMapping("/admins")
    public List<User> getAdmins() {
        return userRepository.findByRole("ADMIN");
    }
    

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id, Authentication authentication) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String loggedUser = authentication.getName();

        if(user.getUsername().equals(loggedUser)){
            throw new RuntimeException("You cannot delete your own account");
        }

        if(user.getRole().equals("ADMIN")){
            throw new RuntimeException("Admin cannot be deleted");
        }

        userRepository.delete(user);
    }

    @DeleteMapping("/stalls/{id}")
    public void deleteStall(@PathVariable Long id) {
        stallRepository.deleteById(id);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setDeleted(true);

        productRepository.save(product);
    }

    @DeleteMapping("/orders/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
    
    @GetMapping("/revenue")
    public List<Map<String,Object>> getRevenueAnalytics() {

        List<OrderItem> items =
                orderItemRepository.findAll();

        Map<String, Double> stallRevenue =
                new HashMap<>();

        for(OrderItem item : items){

            String stallName =
                    item.getProduct()
                        .getStall()
                        .getName();

            double amount =
                    item.getPrice() *
                    item.getQuantity();

            stallRevenue.put(
                    stallName,
                    stallRevenue.getOrDefault(
                            stallName,0.0) + amount
            );
        }

        List<Map<String,Object>> result =
                new ArrayList<>();

        for(Map.Entry<String,Double> e
                : stallRevenue.entrySet()){

            double revenue = e.getValue();
            double commission = revenue * 0.10;

            Map<String,Object> data =
                    new HashMap<>();

            data.put("stall",e.getKey());
            data.put("revenue",revenue);
            data.put("commission",commission);

            result.add(data);
        }

        return result;
    }

}