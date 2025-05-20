package com.example.demo.model.entity;


public enum RoleLevel {
    ADMIN(1),
    MANAGER(2),
    USER(3);

    private final int code;

    RoleLevel(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    // 讓 JPA 或程式轉回來用
    public static RoleLevel fromCode(int code) {
        for (RoleLevel level : RoleLevel.values()) {
            if (level.code == code) {
                return level;
            }
        }
        throw new IllegalArgumentException("無效的 level: " + code);
    }
}
