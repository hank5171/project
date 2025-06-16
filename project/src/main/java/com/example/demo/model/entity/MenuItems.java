package com.example.demo.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 SQL:
 CREATE TABLE `menu_items` (
	menu_id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL COMMENT '餐廳 ID',
    `name` VARCHAR(50) COMMENT '餐點名稱',
    `description` VARCHAR(255) COMMENT '商品備註',
    price INT COMMENT '金額',
    `status` TINYINT(1) DEFAULT '1' COMMENT '是否顯示(隱藏:0 顯示:1)',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否已刪除（0:否 1:是）',
    -- 外鍵設定
    CONSTRAINT fk_menu_shop
        FOREIGN KEY (shop_id)
        REFERENCES shop(shop_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) COMMENT='餐點總表'; 
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MenuItems {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id")
	private Integer menuId;
	
	@Column(name = "shop_id")
	private Integer shopId;
	
	private String name;
	
	private String description;
	
	private Integer price;
	
	private Boolean status;
	
	@Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
	
	@Column(name = "is_deleted")
	private Boolean isDeleted;
}
