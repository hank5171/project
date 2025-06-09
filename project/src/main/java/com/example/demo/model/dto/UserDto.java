package com.example.demo.model.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private Integer userId;
    private String userName;
    private Integer userRole;
    private Boolean status;
    private LocalDateTime lastLoginTime;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
    private Boolean isDeleted;
}
















