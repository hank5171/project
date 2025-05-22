package com.example.demo.controller;

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
import com.example.demo.model.dto.UserCert;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.CertService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5174"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
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
		if (session.getAttribute("userCert") == null) {
			return ResponseEntity
					.status(HttpStatus.UNAUTHORIZED)
					.body(ApiResponse.error(401, "登出失敗: 尚未登入"));
		}
		session.invalidate();
		return ResponseEntity.ok(ApiResponse.success("登出成功", null ));
	}
	
	@GetMapping("/check-login")
	public ResponseEntity<ApiResponse<Boolean>> checkLogin(HttpSession session){
		boolean loggedIn = session.getAttribute("userCert") != null;
	    return ResponseEntity.ok(ApiResponse.success("檢查登入", loggedIn));
	}
}
