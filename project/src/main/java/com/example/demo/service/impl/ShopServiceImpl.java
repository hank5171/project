package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.ShopMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.dto.ShopDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.Shop;
import com.example.demo.repository.ShopRepository;
import com.example.demo.service.shopService;

@Service
public class ShopServiceImpl implements shopService {

	@Autowired
	private ShopRepository shopRepository;
	
	@Autowired
	private ShopMapper shopMapper;

	// 找所有餐廳
	@Override
	public List<ShopDto> findAllShop() {
		return shopRepository.findAll()
				.stream()
				.map(shopMapper::toDto)
				.toList();
	}
	
	// 找所有不包含刪除餐廳
	@Override
	public List<ShopDto> findByIsDeletedFalse() {
		return shopRepository.findByIsDeletedFalse()
				.stream()
				.map(shopMapper::toDto)
				.toList();
	}
	// 新增餐廳
	@Override
	public void addShop(Shop shop) {
		Shop newShop = new Shop(shop.getShopId(),shop.getShopName(),shop.getTel(),shop.getShopAddress(),shop.getIsDeleted());
		shopRepository.save(newShop);
	}
}
