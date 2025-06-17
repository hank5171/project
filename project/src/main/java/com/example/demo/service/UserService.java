package com.example.demo.service;

import java.util.List;
import com.example.demo.exception.UserException;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.dto.UserUpdateRequestDto;

public interface UserService {
	public List<UserDto> findAllUser(); // 查詢所有使用者
	public List<UserDto> findByIsDeletedFalse(); // 查詢沒有被刪除所有使用者
	public void addUser(String userName, String password, Integer userRole, Boolean status);  // 添加使用者
	public UserDto updateUser(Integer userId,String userName, String password, Integer userRole, Boolean status);  // 修改使用者
	public UserDto updateUser(UserUpdateRequestDto request) throws UserException;  // 修改使用者
	public void deleteUser(Integer userId) throws UserException; // 刪除使用者
}
