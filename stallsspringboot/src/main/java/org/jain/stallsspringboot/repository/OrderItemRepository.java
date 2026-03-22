package org.jain.stallsspringboot.repository;

import java.util.List;

import org.jain.stallsspringboot.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    List<OrderItem> findByProductStallUserUsername(String username);
    
    @Query("""
    	    SELECT SUM(oi.product.price * oi.quantity)
    	    FROM OrderItem oi
    	    WHERE oi.product.stall.user.username = :username
    	    """)
    	    Double sumRevenueByVendor(@Param("username") String username);

    	    @Query("""
    	    SELECT COUNT(DISTINCT oi.order.id)
    	    FROM OrderItem oi
    	    WHERE oi.product.stall.user.username = :username
    	    """)
    	    Long countOrdersByVendor(@Param("username") String username);
}