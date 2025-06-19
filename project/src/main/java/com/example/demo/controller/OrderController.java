package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.example.demo.exception.OrderNotFoundException;
import com.example.demo.exception.PermissionDeniedException;
import com.example.demo.model.dto.OrderDto;
import com.example.demo.model.dto.OrderListDto;
import com.example.demo.model.entity.Order;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.OrderRepository.OrderListView;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.OrderService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RestController
@RequestMapping("/order")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5173"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
    	order.setTotalPrice(order.getTotalPrice());
        order.setCreated_at(LocalDateTime.now());
        order.setUpdated_at(LocalDateTime.now());
        Order saved = orderService.createOrder(order);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping("/menuHistory")
    public ResponseEntity<List<Object[]>> getMyOrders(HttpSession session){
    	 Object userIdObj = session.getAttribute("userId");

         Integer userId = (Integer) userIdObj;

         List<Object[]> orders = orderRepository.findOrderDetailsByUserId(userId);

         return ResponseEntity.ok(orders);
     }
    
    @GetMapping("/orderList")
    public ResponseEntity<List<OrderListView>> getOrderList() {
        return ResponseEntity.ok(orderRepository.findOrderList());
    }
    

}
