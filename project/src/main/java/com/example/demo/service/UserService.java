package com.example.demo.service;

import java.util.List;

import com.example.demo.model.dto.UserDto;

public interface UserService {
	public List<UserDto> findAllUser(); // 查詢所有使用者
	public void addUser(String userName, String password, Integer userRole, Boolean status);  // 添加使用者
	public void updateUser(Integer userId, UserDto userDto);  // 修改使用者
	public void updateUser(Integer userId,String userName, String password, Integer userRole, Boolean status);  // 修改使用者
	public void deleteRoom(Integer userId); // 刪除使用者
}
