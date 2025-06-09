package com.example.demo.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.UserException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.util.Hash;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
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
	
	//找所有使用者
	@Override
	public List<UserDto> findByIsDeletedFalse() { 
	    return userRepository.findByIsDeletedFalse()
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
	@Transactional
	public void deleteUser(Integer userId) throws UserException {
	    if (userId == null) {
	        throw new IllegalArgumentException("userId 不可為 null");
	    }
	    
	    // 使用 findById 確保返回 managed 實體
	    User user = userRepository.findById(userId)
	        .orElseThrow(() -> new UserException("查無此使用者 (userId: " + userId + ")"));
	    
	    if (user.getIsDeleted()) {
	        throw new UserException("此使用者已被刪除");
	    }
	    
	    user.setIsDeleted(true);
	    userRepository.save(user);
	    userRepository.flush();  // 強制刷新事務
	    
	    log.info("使用者標記為已刪除: userId={}, username={}", userId, user.getUsername());
	}
}
