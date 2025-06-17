package com.example.demo.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.example.demo.model.dto.MessageDto;
import com.example.demo.model.entity.Message;

import jakarta.annotation.PostConstruct;

@Component // 此物件由 Springboot 來管理
public class MessageMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@PostConstruct
	public void init() {
	    modelMapper.typeMap(MessageDto.class, Message.class).addMappings(mapper -> {
	        mapper.skip(Message::setMessageId);
	    });
	}

	public MessageDto toDto(Message message) {
		// entity 轉 DTO
		return modelMapper.map(message, MessageDto.class);
	}
	
	public Message toEntity(MessageDto messageDto) {
		// DTO 轉 Entity
		return modelMapper.map(messageDto, Message.class);
	}
}
