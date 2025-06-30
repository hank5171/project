package com.example.demo.service;

import com.example.demo.model.dto.OrderDto;
import com.example.demo.model.entity.Order;

public interface OrderService {
	 public Order createOrder(OrderDto orderDto);
	 public Order updateOrder(Integer orderId, Order order);
}
