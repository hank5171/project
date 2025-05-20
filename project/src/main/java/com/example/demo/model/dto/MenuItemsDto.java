package com.example.demo.model.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemsDto {
	private Integer menuId;
	private Integer shopId;
	private String name;
	private String description;
	private Integer price;
	private Boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
	private Boolean isDeleted;
}
