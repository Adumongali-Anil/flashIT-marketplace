package org.jain.stallsspringboot.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.jain.stallsspringboot.dto.VendorRevenueDTO;
import org.jain.stallsspringboot.entity.Cart;
import org.jain.stallsspringboot.entity.Order;
import org.jain.stallsspringboot.entity.OrderItem;
import org.jain.stallsspringboot.entity.Product;
import org.jain.stallsspringboot.entity.User;
import org.jain.stallsspringboot.repository.CartRepository;
import org.jain.stallsspringboot.repository.OrderItemRepository;
import org.jain.stallsspringboot.repository.OrderRepository;
import org.jain.stallsspringboot.repository.ProductRepository;
import org.jain.stallsspringboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
	@RequestMapping("/api/orders")
	public class OrderController {

	    @Autowired
	    private CartRepository cartRepository;

	    @Autowired
	    private OrderRepository orderRepository;

	    @Autowired
	    private UserRepository userRepository;
	    
	    @Autowired
	    private ProductRepository productRepository;
	    
	    @Autowired
	    private OrderItemRepository orderItemRepository;
	    
	    @GetMapping("/my-orders")
	    public List<Order> getMyOrders(Authentication authentication) {

	        String username = authentication.getName();

	        return orderRepository.findByUserUsername(username);
	    }
	    
	    @GetMapping("/vendor-orders")
	    public List<OrderItem> getVendorOrders(Authentication authentication) {

	        String username = authentication.getName();

	        return orderItemRepository
	                .findByProductStallUserUsername(username);
	    }
	    
	    @GetMapping("/vendor-revenue")
	    public VendorRevenueDTO getVendorRevenue(Authentication authentication) {

	        String username = authentication.getName();

	        List<OrderItem> items =
	                orderItemRepository.findByProductStallUserUsername(username);

	        double totalRevenue = 0;
	        long totalProductsSold = 0;

	        Set<Long> uniqueOrders = new HashSet<>();

	        for (OrderItem item : items) {
	            totalRevenue += item.getPrice() * item.getQuantity();
	            totalProductsSold += item.getQuantity();
	            uniqueOrders.add(item.getOrder().getId());
	        }

	        long totalOrders = uniqueOrders.size();

	        return new VendorRevenueDTO(
	                totalOrders,
	                totalProductsSold,
	                totalRevenue
	        );
	    }
	    
//	    <------------------------------------------------------------------------------------>

	    @PostMapping("/checkout")
	    public String checkout(Authentication authentication) {

	        String username = authentication.getName();

	        User user = userRepository.findByUsername(username).get();

	        List<Cart> cartItems = cartRepository.findByUserUsername(username);

	        if (cartItems.isEmpty()) {
	            throw new RuntimeException("Cart is empty");
	        }

	        Order order = new Order();
	        order.setUser(user);
	        order.setOrderDate(LocalDateTime.now());
	        order.setStatus("PLACED");

	        double total = 0;

	        List<OrderItem> orderItems = new ArrayList<>();

	        for (Cart cart : cartItems) {

	            Product product = cart.getProduct();

	            if (product.getStock() < cart.getQuantity()) {
	                throw new RuntimeException(
	                    product.getName() + " is out of stock"
	                );
	            }
	            
	            
	            
	            

	    // <>-----------reduce stock-------------------------------------<>
	            product.setStock(
	                product.getStock() - cart.getQuantity()
	            );

	            productRepository.save(product);

	            OrderItem item = new OrderItem();
	            item.setProduct(product);
	            item.setQuantity(cart.getQuantity());
	            item.setPrice(product.getPrice());
	            item.setOrder(order);

	            total += product.getPrice() * cart.getQuantity();

	            orderItems.add(item);
	        }

	        order.setTotalAmount(total);
	        order.setItems(orderItems);

	        orderRepository.save(order);

	        cartRepository.deleteAll(cartItems);

	        return "Order Placed Successfully";
	    }
	}


