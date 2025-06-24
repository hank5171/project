package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.extern.slf4j.Slf4j;

@Slf4j // 紀錄log
@Controller
@RequestMapping("/home")
//@CrossOrigin(origins = "${cors.allowed-origins}", allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id << 用 CorsConfig 來管理
public class HomeController {
	
	
	
}
