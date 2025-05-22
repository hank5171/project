package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.demo.service.CertService;

@SpringBootTest
public class LoginTest {
	
	@Autowired
	private CertService certService;
	
	@Test
	public void LoginTest() {
	    System.out.println("==== Test started ====");
	    try {
			System.out.println(certService.getCert("hank", "1234"));
	    } catch (Exception e) {
	        System.out.println("❌ 發生例外：" + e.getClass().getName() + " - " + e.getMessage());
	        e.printStackTrace(); // 印出完整錯誤
	    }
	}
}
