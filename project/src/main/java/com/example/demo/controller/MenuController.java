package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.entity.MenuItems;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.MenuItemsService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/menu")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5173"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
public class MenuController {
	
	@Autowired
	private MenuItemsService menuItemsService;
	
	@GetMapping
	public ResponseEntity<List<MenuItems>> getMenuItemsList(){
		List<MenuItems> menuItems = menuItemsService.getMenuItems();
		return ResponseEntity.ok(menuItems);

	}
}
