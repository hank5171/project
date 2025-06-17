package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.dto.MessageDto;
import com.example.demo.service.MessageService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/message")
@CrossOrigin(origins = {"http://localhost:8002","http://localhost:5173"}, allowCredentials = "true") // allowCredentials = "true" 允許接收客戶端傳來的憑證資料,例如: session id
public class MessageController {
	
	@Autowired
	private MessageService messageService;

	@GetMapping
	public ResponseEntity<List<MessageDto>> getMessage(){
		List<MessageDto> messageDtos = messageService.findAllMessage();
		return ResponseEntity.ok(messageDtos);
	}
	
	@PostMapping("/menuPost")
	public ResponseEntity<MessageDto> addMessage(@RequestBody MessageDto messageDto) {
		messageService.addMessage(messageDto);
		return ResponseEntity.ok(messageDto);	
	}
}
