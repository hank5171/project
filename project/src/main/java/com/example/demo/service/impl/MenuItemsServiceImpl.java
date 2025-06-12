package com.example.demo.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.exception.OrderNotFoundException;
import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.entity.MenuItems;
import com.example.demo.repository.MenuItemsRepository;
import com.example.demo.service.MenuItemsService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class MenuItemsServiceImpl implements MenuItemsService {

	@Autowired
	private MenuItemsRepository menuItemsRepository;
	
	@Override
	public List<MenuItems> getMenuItems() {
		return menuItemsRepository.getAllMenuList();
	}
	

	@Override
	@Transactional
	public void removeMenuList(Integer menuId) throws OrderNotFoundException {
	    if (menuId == null) {
	        throw new OrderNotFoundException("menuId 不可為null");
	    }

	    MenuItems menuItem = menuItemsRepository.findById(menuId)
	            .orElseThrow(() -> new OrderNotFoundException("查無餐點(menuId: " + menuId + ")"));
	    
	    if(menuItem.getStatus()) {
	    	menuItem.setStatus(false);
	    	menuItemsRepository.save(menuItem);
	    	menuItemsRepository.flush();  // 強制刷新事務
	    	log.info("菜單設為已下架: MenuId={}", menuItem.getMenuId());
	    	return;
	    } else {
	    	menuItem.setStatus(true);
	    	menuItemsRepository.save(menuItem);
	    	menuItemsRepository.flush();  // 強制刷新事務
	    	log.info("菜單設為已上架: MenuId={}", menuItem.getMenuId());
	    	return;
		}
	}
	
	@Override
	public List<MenuItemWithShopDTO> findAllMenuWithShop(){
		return menuItemsRepository.findAllMenuWithShop();
	}
	
	@Override
	public List<MenuItemWithShopDTO> findAllMenuWithShop(String shopName, Boolean status) {
	    if (shopName != null && status != null) {
	        return menuItemsRepository.findAllMenuWithShopNameStatus(shopName, status);
	    } else if (shopName != null) {
	        return menuItemsRepository.findAllMenuWithShopName(shopName);
	    } else if (status != null) {
	        return menuItemsRepository.findAllMenuWithShopStatus(status);
	    } else {
	        return menuItemsRepository.findAllMenuWithShop();
	    }
	}

	@Override
	public void removeMenuitems() {
		menuItemsRepository.removeMenuitems();
	}

	@Override
	public void onShelf(List<Integer> shopIds) {
		menuItemsRepository.onShelf(shopIds);
	}
}
