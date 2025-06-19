package com.example.demo.model.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderListDto {
	private String username;
	private String shopname;
	private	String name;
	private String tel;
	private Integer quantity;
	private Integer price;
	private Integer totalprice;
	private String customized;
	private LocalDateTime created_at;
	
}
