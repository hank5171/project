package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.dto.OrderDto;
import com.example.demo.model.dto.OrderListDto;
import com.example.demo.model.entity.Order;
import com.example.demo.model.entity.User;

// Spring JPA
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> { // User: entity, Integer: @Id 的類別
	// 用userId找訂單
	@Query(value = "SELECT b.name, b.description, a.quantity, a.price, a.total_price, a.customized, a.created_at FROM orders a LEFT JOIN menu_items b ON a.menu_id = b.menu_id WHERE a.user_id =:userId"
    ,nativeQuery = true)
	List<Object[]> findOrderDetailsByUserId(@Param("userId") Integer userId);

	
//	@Query(value = "SELECT b.username,c.shop_name,d.name,a.quantity,a.price,a.total_price,a.customized,a.created_at FROM orders a LEFT JOIN users b ON a.user_id = b.user_id LEFT JOIN menu_items d ON d.menu_id = a.menu_id LEFT JOIN shop c ON d.shop_id = c.shop_id;")
//	List<OrderListDto> findOrderList();
	
	public interface OrderListView {
	    String getUsername();
	    String getShopname();
	    String getName();
	    String gettel();
	    Integer getQuantity();
	    Integer getPrice();
	    Integer getTotalprice();
	    String getCustomized();
	    LocalDateTime getCreated_at();
	}
	// 找訂單總覽
	@Query(value = "SELECT b.username AS username, c.shop_name AS shopname, d.name AS name, c.tel , a.quantity, a.price, a.total_price AS totalprice, a.customized, a.created_at FROM orders a LEFT JOIN users b ON a.user_id = b.user_id LEFT JOIN menu_items d ON d.menu_id = a.menu_id LEFT JOIN shop c ON d.shop_id = c.shop_id", nativeQuery = true)
	List<OrderListView> findOrderList();
}

