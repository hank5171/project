package com.example.demo.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
	private Integer userId;
    private String username;
    private String password;
    private Integer userRole;
    private Boolean status;
    private Boolean isDeleted;
    // Getters / Setters
}

