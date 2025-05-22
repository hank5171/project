package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.demo.service.UserService;

@SpringBootTest
public class RegisterTest {
	
	@Autowired
	private UserService userService;
	
	@Test
	public void testAddUser() {
	    System.out.println("==== testAddUser started ====");
	    try {
	        userService.addUser("abc", "1234", 1, true);
	        System.out.println("User add ok!");
	    } catch (Exception e) {
	        System.out.println("❌ 發生例外：" + e.getClass().getName() + " - " + e.getMessage());
	        e.printStackTrace(); // 印出完整錯誤
	    }
	}
}
