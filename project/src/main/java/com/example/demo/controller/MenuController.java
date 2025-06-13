package com.example.demo.controller;

import java.util.List;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.exception.OrderNotFoundException;
import com.example.demo.model.dto.MenuItemWithShopDTO;
import com.example.demo.model.entity.MenuItems;
import com.example.demo.model.entity.UserCert;
import com.example.demo.service.MenuItemsService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	// 取得條件菜單列表
	@GetMapping("/LikeList")
	public ResponseEntity<List<MenuItemWithShopDTO>> getMenuItemsShopNameList(
	    @RequestParam(required = false) String shopName,
	    @RequestParam(required = false) Boolean status
	) {
	    List<MenuItemWithShopDTO> menuItemWithShopDTOs = menuItemsService.findAllMenuWithShop(shopName, status);
	    return ResponseEntity.ok(menuItemWithShopDTOs);
	}
	
	// 新增菜單內容
	@PostMapping("/add")
	public ResponseEntity<MenuItems> addMenuItemsList(@RequestBody
			MenuItemWithShopDTO dto){
		MenuItems result = menuItemsService.addItems(dto);
	    return ResponseEntity.ok(result);
	}
	
	// 編輯菜單列表
	@PutMapping("/{menuId}")
	public ResponseEntity<Map<String, Object>> removeMenuItem(@PathVariable Integer menuId) throws OrderNotFoundException {
	    menuItemsService.removeMenuList(menuId);
	    return ResponseEntity.ok(Map.of("success", true, "message", "修改成功"));
	}
	
	// 下架菜單列表
	@PutMapping("/remove")
	public ResponseEntity<Map<String, Object>> removeMenuitems() {
	    menuItemsService.removeMenuitems();
	    return ResponseEntity.ok(Map.of("success", true, "message", "全部商品已下架"));
	}
	
	// 選擇餐廳菜單上架
	@PutMapping("/batch/onShelf")
	public ResponseEntity<?> batchOnShelf(@RequestBody Map<String, List<Integer>> request, HttpSession session) {
	    List<Integer> shopIds = request.get("shopIds"); // 這裡 key 要和前端一致
	    menuItemsService.onShelf(shopIds);
	    UserCert userCert = (UserCert)session.getAttribute("userCert");
	    log.info("上架: user={} ShopId={}", userCert.getUserId(),shopIds);
	    // shopIds 就是 [1, 2]
	    return ResponseEntity.ok(Map.of("success", true, "message", "所選店家商品已全部上架"));
	}
}
