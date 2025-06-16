package com.example.demo.service;

import java.util.List;

import com.example.demo.model.dto.ShopDto;
import com.example.demo.model.entity.Shop;

public interface shopService {
	public List<ShopDto> findAllShop(); // 查詢所有餐廳
	public List<ShopDto> findByIsDeletedFalse(); // 查詢所有沒有被刪除餐廳
	public void addShop(Shop shop);
	public Shop updateShop(ShopDto shopDto);
}
