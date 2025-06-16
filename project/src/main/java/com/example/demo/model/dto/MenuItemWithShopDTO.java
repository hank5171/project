package com.example.demo.model.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

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
    @JsonProperty("menuName")
    private String name;
    private String description;
    private Integer price;
    private Boolean status;
    private Timestamp createdAt; // 型態要和資料庫一致
    private Boolean isDeleted;

}
