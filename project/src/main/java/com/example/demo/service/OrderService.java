package com.example.demo.service;

import com.example.demo.model.entity.Order;

public interface OrderService {
	 public Order createOrder(Order order);
	 public Order updateOrder(Integer orderId, Order order);
}
