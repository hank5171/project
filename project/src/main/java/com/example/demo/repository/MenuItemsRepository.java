package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.entity.MenuItems;
import com.example.demo.model.entity.User;

// Spring JPA
@Repository
public interface MenuItemsRepository extends JpaRepository<User, Integer> { // User: entity, Integer: @Id 的類別

	@Query(value = "SELECT `menu_id`,`shop_id`,`name`,`description`,`price`,`status`,`created_at`,`updated_at`,`is_deleted` FROM menu_items;", nativeQuery = true)
	List<MenuItems> getAllMenuList();
	
	@Query(value = "SELECT a.menu_id, a.shop_id, b.shop_name, a.name, a.description, a.price, a.status, a.created_at, a.is_deleted FROM menu_items a LEFT JOIN shop b ON a.shop_id = b.shop_id", nativeQuery = true)
	List<MenuItemWithShopDTO> findAllMenuWithShop();

}
