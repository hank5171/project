package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.model.entity.User;

// Spring JPA
@Repository
public interface MenuItemsRepository extends JpaRepository<User, Integer> { // User: entity, Integer: @Id 的類別
	// 預設會實現CRUD
	// 自定義查詢
	// 1. 查詢 roomSize 大於指定值房間(自動生成 SQL)
	List<User> findByRoomSizeGreaterThan(Integer size);
	
	// 2. 查詢 roomSize 大於指定值得房間(自行鑽寫 T-SQL, 注意: 欄位名要符合資料表)
	@Query(value = "select room_id, room_name, room_size from room where room_size > :roomSize", nativeQuery = true)
	List<User> findRooms(Integer roomSize);
	
	// 3. 查詢 roomSize 大於指定值的房間(自行鑽寫 PQL, 注意: 欄位名要符合 entity 中的設定)
	@Query(value = "select r from Room r where r.roomSize > :roomSize")
	List<User> readRooms(Integer roomSize);
}
