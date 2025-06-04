package com.example.demo.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.util.Hash;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserMapper userMapper;
	
	//找所有使用者
	@Override
	public List<UserDto> findAllUser() { 
		return userRepository.findAll()
				.stream()
				.map(userMapper::toDto)
				.toList();
	}
	
	//新增使用者
	@Override
	public void addUser(String userName, String password, Integer userRole, Boolean status) {
		String salt = Hash.getSalt();
		String passwordHash = Hash.getHash(password, salt);
		User user = new User(userName, passwordHash,salt , userRole,status);
		userRepository.save(user);
	}

	@Override
	public void updateUser(Integer userId, UserDto userDto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateUser(Integer userId, String userName, String password, Integer userRole, Boolean status) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteRoom(Integer userId) {
		// TODO Auto-generated method stub
		
	}
}
