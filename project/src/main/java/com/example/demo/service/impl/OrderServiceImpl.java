package com.example.demo.service.impl;

import com.example.demo.mapper.OrderMapper;
import com.example.demo.model.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.entity.Order;
import com.example.demo.repository.OrderRepository;
import com.example.demo.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderMapper orderMapper;
	
	@Override
	public Order createOrder(OrderDto orderDto) {
		Order order = orderMapper.toEntity(orderDto);
        return orderRepository.save(order);
	}
	
	@Override
	public Order updateOrder(Integer orderId, Order order) {
		
		return orderRepository.save(order);
	}
	
}
