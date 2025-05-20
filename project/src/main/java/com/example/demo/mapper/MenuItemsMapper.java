package com.example.demo.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.model.dto.MenuItemsDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.MenuItems;
import com.example.demo.model.entity.User;

@Component // 此物件由 Springboot 來管理
public class MenuItemsMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public MenuItemsDto toDto(MenuItems menuItems) {
		// entity 轉 DTO
		return modelMapper.map(menuItems, MenuItemsDto.class);
	}
	
	public MenuItems toEntity(MenuItemsDto menuItemsDto) {
		// DTO 轉 Entity
		return modelMapper.map(menuItemsDto, MenuItems.class);
	}
}
