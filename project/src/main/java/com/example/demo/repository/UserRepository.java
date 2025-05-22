package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.model.entity.User;

// Spring JPA
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	@Query(value = "select user_id, username, password, password_salt, status, user_role,last_login_time,created_at, updated_at, is_deleted from users where username=:username", nativeQuery = true)
	User getUser(String username);
	// 可以自行練習其他寫法...
}
