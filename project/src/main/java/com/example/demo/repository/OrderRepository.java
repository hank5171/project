package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.Order;
import com.example.demo.model.entity.User;

// Spring JPA
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> { // User: entity, Integer: @Id 的類別
	List<Order> findByUserId(Integer userId);
	
	@Query(value = "SELECT b.name, b.description, a.quantity, b.price, a.customized, a.created_at " +
            "FROM orders a " +
            "LEFT JOIN menu_items b ON a.menu_id = b.menu_id " +
            "WHERE a.user_id = :userId", 
    nativeQuery = true)
	List<Object[]> findOrderDetailsByUserId(@Param("userId") Integer userId);
	
}