package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.model.entity.Role;


//Spring JPA
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
	@Query(value = "SELECT role_id,role_name,level FROM role;", nativeQuery = true)
	List<Role> getAllRole();
}
