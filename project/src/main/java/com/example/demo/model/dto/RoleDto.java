package com.example.demo.model.dto;

import com.example.demo.model.entity.RoleLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class RoleDto {
	private Integer roleId;
	
	private RoleLevel level;
	
	private String roleName;
	
}
