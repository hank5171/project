package com.example.demo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopDto {
	private Integer shopId;
	private String shopName;
	private String tel;
	private String shopAddress;
    private Boolean isDeleted;
}
