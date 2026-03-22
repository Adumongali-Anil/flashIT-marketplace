package org.jain.stallsspringboot.controller;

import org.jain.stallsspringboot.entity.Cart;
import org.jain.stallsspringboot.entity.Product;
import org.jain.stallsspringboot.entity.User;
import org.jain.stallsspringboot.repository.CartRepository;
import org.jain.stallsspringboot.repository.ProductRepository;
import org.jain.stallsspringboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // Add to cart
    @PostMapping("/add/{productId}")
    public Cart addToCart(@PathVariable Long productId,
                          @RequestParam int quantity,
                          Authentication authentication) {

        String username = authentication.getName();

        User user = userRepository.findByUsername(username).get();

        Product product = productRepository.findById(productId).get();

        Cart existingCart =
                cartRepository.findByUserUsernameAndProductId(username, productId);

        if(existingCart != null){

            existingCart.setQuantity(
                    existingCart.getQuantity() + quantity
            );

            return cartRepository.save(existingCart);

        }

        Cart cart = new Cart();

        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }

    // View my cart
    @GetMapping("/my-cart")
    public List<Cart> getMyCart(Authentication authentication) {

        String username = authentication.getName();
        return cartRepository.findByUserUsername(username);
    }


    
    @DeleteMapping("/remove/{id}")
    public String removeFromCart(@PathVariable int id,
                                 Authentication authentication) {

        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        String username = authentication.getName();

        if (!cart.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized");
        }

        cartRepository.delete(cart);

        return "Removed successfully";
    }
}