package com.example.demo.model.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemWithShopDTO {
    private Integer menuId;
    private Integer shopId;
    private String shopName;
    private String name;
    private String description;
    private Integer price;
    private Boolean status;
    private Timestamp createdAt;
    private Boolean isDeleted;

}
