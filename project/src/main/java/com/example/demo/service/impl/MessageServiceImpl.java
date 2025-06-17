package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.MessageMapper;
import com.example.demo.model.dto.MessageDto;
import com.example.demo.model.entity.Message;
import com.example.demo.repository.MessageRepository;
import com.example.demo.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private MessageMapper messageMapper;
	
	// 找所有訊息
	@Override
	public List<MessageDto> findAllMessage() {
		return messageRepository.findAll()
				.stream()
				.map(messageMapper::toDto)
				.toList();
	}

	@Override
	public void addMessage(MessageDto messageDto) {
		Message message = messageRepository.save(messageMapper.toEntity(messageDto));
	}
}
