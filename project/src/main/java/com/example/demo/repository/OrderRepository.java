package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.model.entity.User;

// Spring JPA
@Repository
public interface OrderRepository extends JpaRepository<User, Integer> { // User: entity, Integer: @Id 的類別

}
