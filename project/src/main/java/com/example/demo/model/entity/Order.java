package com.example.demo.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 SQL:
 CREATE TABLE `order` (
	order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL COMMENT '點餐會員',
    menu_id INT COMMENT '餐點 ID', 
    quantity INT NOT NULL DEFAULT '1' COMMENT '數量',
    customized TEXT COMMENT '客製化備註',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間',
    CONSTRAINT fk_order_user
		FOREIGN KEY (user_id)
		REFERENCES `user`(user_id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,
	CONSTRAINT fk_order_menu_items
		FOREIGN KEY (menu_id)
		REFERENCES `menu_items`(menu_id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
) COMMENT='訂單總表';
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")  // 避免使用保留字
public class Order {
	@Id
	@Column(name = "order_id")
	private Integer orderId;
	
	@Column(name = "user_id")
	private Integer userId;
	
	@Column(name = "menu_id")
	private Integer menuId;
	
	private Integer quantity;
	
	private String customized;
	
    @Column(name = "created_at") 
	private LocalDateTime created_at;

    @Column(name = "updated_at") 
	private LocalDateTime updated_at;
	
}
