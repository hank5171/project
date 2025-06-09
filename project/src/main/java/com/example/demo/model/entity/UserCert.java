package com.example.demo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class UserCert {
	private Integer userId; // 使用者 Id
	private String username; // 使用者名稱
	private Integer role; // 角色權限
	private Boolean status; //使用狀態 
	private Boolean isDeleted; // 是否被刪除	
}
