package com.example.demo.controller;

import java.util.HashMap;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.exception.CertException;
import com.example.demo.model.entity.UserCert;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.CertService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
@Slf4j // 紀錄log
@Controller
@RequestMapping("/")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5173"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
public class LoginController {
	
	@Autowired
	private CertService certService;
	
	// 登入系統
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<Void>> login(@RequestParam String username, @RequestParam String password, HttpSession session){
	    //System.out.println("🟡 [Login API] username = " + username + ", password = " + password);
		try {
			UserCert userCert = certService.getCert(username, password);
			session.setAttribute("userCert",userCert);
			session.setAttribute("userId", userCert.getUserId());
			System.out.println(userCert);
			log.info("登入成功: user={} roleId={}", username, userCert.getRole() == 1 ? "管理員" : "一般使用者" );
			return ResponseEntity.ok(ApiResponse.success("登入成功", null));
		} catch (CertException e) {
			return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(ApiResponse.error(401, "登入失敗:" + e.getMessage()));
		}
	}
	/*
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<Void>> login(
	    @RequestParam String username,
	    @RequestParam String password,
	    HttpSession session) {

	    System.out.println("🟡 [Login API] username = " + username + ", password = " + password);

	    try {
	        UserCert userCert = certService.getCert(username, password);
	        session.setAttribute("userCert", userCert);
	        return ResponseEntity.ok(ApiResponse.success("登入成功", null));
	    } catch (CertException e) {
	        return ResponseEntity
	            .status(HttpStatus.UNAUTHORIZED)
	            .body(ApiResponse.error(401, "登入失敗:" + e.getMessage()));
	    }
	}
	*/
	// 登出系統
	@GetMapping("/logout")
	public ResponseEntity<ApiResponse<Void>> logout(HttpSession session){
	    Object certObj = session.getAttribute("userCert"); // 存取session資料
		if (session.getAttribute("userCert") == null) {
			return ResponseEntity
					.status(HttpStatus.UNAUTHORIZED)
					.body(ApiResponse.error(401, "登出失敗: 尚未登入"));
		}
		UserCert cert = (UserCert) certObj; // 轉為UserCert型態
		log.info("登出成功: user={}",cert.getUsername()); // 紀錄log
		session.invalidate();
		return ResponseEntity.ok(ApiResponse.success("登出成功", null ));
	}
	/**
	@GetMapping("/check-login")
	public ResponseEntity<ApiResponse<Boolean>> checkLogin(HttpSession session){
		boolean loggedIn = session.getAttribute("userCert") != null;
	    return ResponseEntity.ok(ApiResponse.success("檢查登入", loggedIn));
	}
	 */
	
	@GetMapping("/check-login")
	public ResponseEntity<Map<String, Object>> checkLogin(HttpSession session) {
	    Map<String, Object> response = new HashMap<>();
	    Object userObj = session.getAttribute("userCert");

	    if (userObj instanceof UserCert userCert) {
	    	response.put("userId", userCert.getUserId());
	        response.put("username", userCert.getUsername());
	        response.put("status", userCert.getStatus());
	        response.put("role", userCert.getRole());
	    } else {
	        response.put("status", false);
	    }
	    return ResponseEntity.ok(response);
	}
}
