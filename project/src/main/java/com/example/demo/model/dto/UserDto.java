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
    private String passwordSalt;
    private Integer userRole;
    private Boolean status;
    private LocalDateTime lastLoginTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;
   
}





