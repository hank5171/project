package com.example.demo.model.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemsDto {
	private Integer menuId;
	private Integer shopId;
	@JsonProperty("menuName")
	private String name;
	private String description;
	private Integer price;
	private Boolean status;
	private Boolean isDeleted = false;
}
