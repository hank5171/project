package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.entity.MenuItems;

import jakarta.transaction.Transactional;

// Spring JPA
@Repository
public interface MenuItemsRepository extends JpaRepository<MenuItems, Integer> { // User: entity, Integer: @Id 的類別
	// 查詢菜單
	@Query(value = "SELECT `menu_id`,`shop_id`,`name`,`description`,`price`,`status`,`created_at`,`updated_at`,`is_deleted` FROM menu_items;", nativeQuery = true)
	List<MenuItems> getAllMenuList();
	
	// 查詢全部菜單
	@Query(value = "SELECT a.menu_id, a.shop_id, b.shop_name, a.name, a.description, a.price, a.status, a.created_at, a.is_deleted FROM menu_items a LEFT JOIN shop b ON a.shop_id = b.shop_id", nativeQuery = true)
	List<MenuItemWithShopDTO> findAllMenuWithShop();

	// 查詢菜單商店名稱
	@Query(value = "SELECT a.menu_id, a.shop_id, b.shop_name, a.name, a.description, a.price, a.status, a.created_at, a.is_deleted FROM menu_items a LEFT JOIN shop b ON a.shop_id = b.shop_id where b.shop_name LIKE concat('%', :shopName, '%')", nativeQuery = true)
	List<MenuItemWithShopDTO> findAllMenuWithShopName(@Param("shopName") String shopName);

	// 查詢菜單商店名稱及上下架狀態
	@Query(value = "SELECT a.menu_id, a.shop_id, b.shop_name, a.name, a.description, a.price, a.status, a.created_at, a.is_deleted " +
	        "FROM menu_items a LEFT JOIN shop b ON a.shop_id = b.shop_id " +
	        "WHERE b.shop_name LIKE CONCAT('%', :shopName, '%') AND a.status = :status", nativeQuery = true)
	List<MenuItemWithShopDTO> findAllMenuWithShopNameStatus(@Param("shopName") String shopName, @Param("status") Boolean status);
	
	// 查詢菜單上下架狀態
	@Query(value = "SELECT a.menu_id, a.shop_id, b.shop_name, a.name, a.description, a.price, a.status, a.created_at, a.is_deleted FROM menu_items a LEFT JOIN shop b ON a.shop_id = b.shop_id where a.status=:status", nativeQuery = true)
	List<MenuItemWithShopDTO> findAllMenuWithShopStatus(@Param("status") Boolean status);
	
	// 商品全下架
	@Modifying
    @Transactional
	@Query(value ="UPDATE menu_items SET status = 0;", nativeQuery = true)
	void removeMenuitems();
	
	// 上架選擇商品
	@Modifying
	@Transactional
	@Query(value ="UPDATE menu_items SET status = 1 WHERE shop_id IN (:shopIds)", nativeQuery = true)
	void onShelf(@Param("shopIds") List<Integer> shopIds);

}
