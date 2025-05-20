package com.example.demo.model.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private Integer userId;
    private String userName;
    private String password;
    private Integer userRole;
    private Boolean status;
    private LocalDateTime lastLoginTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;
    
    public UserDto(String userName, String password, Integer userRole,Boolean status) {
        this.userName = userName;
        this.password = password;
        this.userRole = userRole;
        this.status = status;
    }
}





