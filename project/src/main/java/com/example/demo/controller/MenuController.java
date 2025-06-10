package com.example.demo.controller;

import java.util.List;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.exception.OrderNotFoundException;
import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.entity.MenuItems;
import com.example.demo.service.MenuItemsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@Slf4j
@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5173"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
public class MenuController {
	
	@Autowired
	private MenuItemsService menuItemsService;
	
	// 取得菜單內容
	@GetMapping
	public ResponseEntity<List<MenuItems>> getMenuItemsList(){
		List<MenuItems> menuItems = menuItemsService.getMenuItems();
		return ResponseEntity.ok(menuItems);
	}
	
	// 取得菜單列表
	@GetMapping("/List")
	public ResponseEntity<List<MenuItemWithShopDTO>> getMenuItemsShopList(){
		List<MenuItemWithShopDTO> menuItemWithShopDTOs = menuItemsService.findAllMenuWithShop();
		return ResponseEntity.ok(menuItemWithShopDTOs);
	}
	
	// 新增菜單內容
	@PostMapping("/add")
	public ResponseEntity<MenuItemWithShopDTO> addMenuItemsList(){
		
		
		return null;
	}
	
	@PutMapping("/{menuId}")
	public ResponseEntity<Map<String, Object>> removeMenuItem(@PathVariable Integer menuId) throws OrderNotFoundException {
	    menuItemsService.removeMenuList(menuId);
	    return ResponseEntity.ok(Map.of("success", true, "message", "修改成功"));
	}

}
