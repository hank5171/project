package com.example.demo.service;

import java.util.List;

import com.example.demo.model.dto.MessageDto;


public interface MessageService {
	public List<MessageDto> findAllMessage(); // 查詢所有留言
	public void addMessage(MessageDto messageDto);  // 添加使用者
}
