package com.example.demo.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 CREATE TABLE `role` (
    role_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '角色 ID',
    level	INT NOT NULL deafalut 1
    role_name VARCHAR(50) UNIQUE NOT NULL COMMENT '角色名稱'
 ) COMMENT='角色對照表';

*/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Role {
	@Id
	@Column(name = "role_id")
	private Integer roleId;
	
	@Enumerated(EnumType.ORDINAL)
	private RoleLevel level;
	
	@Column(name = "role_name")
	private String roleName;
	
}
