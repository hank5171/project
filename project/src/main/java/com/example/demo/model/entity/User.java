package com.example.demo.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * Table name: user
 * +---------+-----------+-----------+---------+-----------+--------------------+---------------------+---------------------+------------+
 * | user_id | username | password |user_role| status | last_login_time |
 * created_at | updated_at | is_deleted |
 * +---------+-----------+-----------+---------+-----------+--------------------+---------------------+---------------------+------------+
 * | 1 | 大家號 | hash | 1 | 1 |2025/05/20 14:33:02 | 2025/05/20 14:33:02 |
 * 2025/05/20 14:33:02 | 0 |
 * +---------+-----------+-----------+---------+-----------+--------------------+---------------------+---------------------+------------+
 * SQL: CREATE TABLE `user` ( user_id INT AUTO_INCREMENT PRIMARY KEY , username
 * VARCHAR(50) NOT NULL UNIQUE COMMENT '使用者名稱（帳號）', `password` VARCHAR(255) NOT
 * NULL COMMENT '使用者密碼（加密儲存）', user_role int NOT NULL DEFAULT '2' COMMENT
 * '使用者權限（1:管理員, 2:一般使用者）', `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT
 * '帳號狀態（1 啟用，0 停用）', last_login_time DATETIME DEFAULT NULL COMMENT '最近登入時間',
 * created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間', updated_at
 * DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT
 * '更新時間', is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否已刪除（0:否 1:是）', CONSTRAINT
 * fk_user_role FOREIGN KEY (user_role) REFERENCES role(role_id) ON DELETE
 * RESTRICT ON UPDATE CASCADE );
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users") // 避免使用保留字
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Integer userId;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "password_salt")
	private String passwordSalt;

	@Column(name = "user_role")
	private Integer userRole;

	private Boolean status;

	@Column(name = "last_login_time")
	private LocalDateTime lastLoginTime;

	@Column(name = "created_at", insertable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at", insertable = false, updatable = false)
	private LocalDateTime updatedAt;

	@Column(name = "is_deleted", insertable = false)
	private Boolean isDeleted;

	public User(String userName, String password, String passwordSalt, Integer userRole, Boolean status) {
		this.username = userName;
		this.passwordSalt = passwordSalt;
		this.password = password;
		this.status = status;
		this.userRole = userRole;
	}
}
