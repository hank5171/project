package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.entity.MenuItems;
import com.example.demo.model.entity.Order;
import com.example.demo.repository.OrderRepository;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.MenuItemsService;
import com.example.demo.service.OrderService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
}
