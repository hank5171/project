package com.example.demo.service;

import java.util.List;

import com.example.demo.exception.OrderNotFoundException;
import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.entity.MenuItems;

public interface MenuItemsService {
	public List<MenuItems> getMenuItems(); 	// 查詢已有菜單內容
	public List<MenuItemWithShopDTO> findAllMenuWithShop(); // 查詢已有菜單店家內容
	public void removeMenuList(Integer menuId) throws OrderNotFoundException; // 下架餐點
}
