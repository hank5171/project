package com.example.demo.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.dto.MenuItemsDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.MenuItems;
import com.example.demo.model.entity.User;

import jakarta.annotation.PostConstruct;

@Component // 此物件由 Springboot 來管理
public class MenuItemsMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostConstruct
	public void setupMapper() {
	    modelMapper.typeMap(MenuItemWithShopDTO.class, MenuItems.class)
	        .addMappings(mapper -> {
	            mapper.skip(MenuItems::setCreatedAt);
	            mapper.skip(MenuItems::setUpdatedAt);
	        });
	}

	
	public MenuItemsDto toDto(MenuItems menuItems) {
		// entity 轉 DTO
		return modelMapper.map(menuItems, MenuItemsDto.class);
	}
	
	public MenuItems toEntity(MenuItemsDto menuItemsDto) {
		// DTO 轉 Entity
		return modelMapper.map(menuItemsDto, MenuItems.class);
	}
	
	public MenuItems toEntity(MenuItemWithShopDTO  menuItemWithShopDTO ) {
		// DTO 轉 Entity
		return modelMapper.map(menuItemWithShopDTO, MenuItems.class);
	}
}
