package com.example.demo.model.entity;

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
	CREATE TABLE `shop` (
	shop_id INT AUTO_INCREMENT PRIMARY KEY,
    shop_name VARCHAR(50) COMMENT '餐廳名稱',
    tel VARCHAR(50) COMMENT '餐點電話',
    shop_address VARCHAR(50) COMMENT '餐廳地址',
    is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否已刪除（0:否 1:是）'
) COMMENT='商家總表';
 * */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Shop {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "shop_id")
	private Integer shopId;
	
	@Column(name = "shop_name")
	private String shopName;
	
	private String tel;
	
	@Column(name = "shop_address")
	private String shopAddress;
	
    @Column(name = "is_deleted") 
    private Boolean isDeleted = false;
}
