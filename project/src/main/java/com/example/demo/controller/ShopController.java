package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.dto.ShopDto;
import com.example.demo.model.entity.Shop;
import com.example.demo.model.entity.UserRequest;
import com.example.demo.repository.ShopRepository;
import com.example.demo.service.shopService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/shop")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5173"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
public class ShopController {
	
	@Autowired
	private ShopRepository shopRepository;

	@Autowired
	private shopService shopService;
	
    @GetMapping
    public ResponseEntity<List<ShopDto>> getShopList(){
    	List<ShopDto> shopDtos = shopService.findAllShop();
    	return ResponseEntity.ok(shopDtos);
     }
    
    @PostMapping("/add")
    public ResponseEntity<Shop> addShop(@RequestBody Shop shop){
    	shopService.addShop(shop);
    	return ResponseEntity.ok(shop);
    }
}
