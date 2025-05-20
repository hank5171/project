package com.example.demo.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.model.dto.ShopDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.Shop;
import com.example.demo.model.entity.User;

@Component // 此物件由 Springboot 來管理
public class ShopMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public ShopDto toDto(Shop shop) {
		// entity 轉 DTO
		return modelMapper.map(shop, ShopDto.class);
	}
	
	public Shop toEntity(ShopDto shopDto) {
		// DTO 轉 Entity
		return modelMapper.map(shopDto, Shop.class);
	}
}
