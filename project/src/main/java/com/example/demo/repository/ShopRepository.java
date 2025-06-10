package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.entity.Shop;


// Spring JPA
@Repository
public interface ShopRepository extends JpaRepository<Shop, Integer> { // Shop: entity, Integer: @Id 的類別
	List<Shop> findByIsDeletedFalse(); // 確認有這個方法

}
