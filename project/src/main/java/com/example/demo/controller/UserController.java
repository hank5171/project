package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.example.demo.exception.UserException;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.dto.UserRequest;
import com.example.demo.model.entity.Role;
import com.example.demo.model.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.UserService;
import com.example.demo.service.impl.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5173"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
public class UserController {

	@Autowired 
	private UserService userService;

	@Autowired
	private RoleRepository roleRepository;

	// 取得所有職位
	
	@GetMapping("/role")
	public ResponseEntity<List<Role>> getAllRole(){
		List<Role> roles = roleRepository.getAllRole();
		return ResponseEntity.ok(roles);
	}
	
    @PostMapping("/add")
    public void addUser(@RequestBody UserRequest request) {
    	userService.addUser(request.getUsername(),
    						request.getPassword(),
    						request.getUserRole(), 
    						request.getStatus());
    }
    
    @GetMapping("/List")
    public ResponseEntity<List<UserDto>> findNotDeleteUser(){
    	List<UserDto> users = userService.findByIsDeletedFalse();
    	return ResponseEntity.ok(users);
    }
    
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) throws UserException{
    	userService.deleteUser(userId);
        return ResponseEntity.noContent().build(); // 204 No Content
    }    
}
