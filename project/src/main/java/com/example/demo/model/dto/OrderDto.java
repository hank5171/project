package com.example.demo.model.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
	private Integer orderId;
	private Integer userId;
	private Integer menuId;
	private Integer quantity;
	private Integer price;
	private Integer totalPrice;
	private String customized;
	private LocalDateTime created_at;
	private LocalDateTime updated_at;
	
}
