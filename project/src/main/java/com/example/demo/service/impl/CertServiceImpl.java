package com.example.demo.service.impl;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.CertException;
import com.example.demo.model.entity.User;
import com.example.demo.model.entity.UserCert;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CertService;
import com.example.demo.util.Hash;

import lombok.extern.slf4j.Slf4j;

@Slf4j // 紀錄log
@Service
public class CertServiceImpl implements CertService{
	
	@Autowired 
	private UserRepository userRepository;
	
	@Override
	public UserCert getCert(String username, String password) throws CertException {
		// 檢查是否有此人
		User user = userRepository.getUser(username);
		/*
		if(user == null) {
			throw new CertException("查無此人");
		} 
		*/
		if(user == null || !user.getStatus()) {
			//throw new CertException("帳號已被停用");
			log.warn("登入失敗：user={}，原因={}", username, user == null ? "帳號不存在" : "密碼錯誤或已被禁用");
			throw new CertException("帳號或密碼錯誤"); // 提示不精準
		}
		// 2. 密碼 hash 比對
		String passwordHash = Hash.getHash(password,user.getPasswordSalt());
		if(!passwordHash.equals(user.getPassword())) {
			throw new CertException("密碼錯誤");
		}
		user.setLastLoginTime(LocalDateTime.now());
		userRepository.save(user);
		// 3. 簽發憑證
		UserCert userCert = new UserCert(user.getUserId(), user.getUsername(), user.getUserRole(), user.getStatus(),user.getIsDeleted());
		return userCert;	
	}
}
