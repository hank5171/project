package com.example.demo.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.entity.MenuItems;
import com.example.demo.repository.MenuItemsRepository;
import com.example.demo.service.MenuItemsService;
@Service
public class MenuItemsServiceImpl implements MenuItemsService {

	@Autowired
	private MenuItemsRepository menuItemsRepository;
	
	@Override
	public List<MenuItems> getMenuItems() {
		return menuItemsRepository.getAllMenuList();
	}

}
