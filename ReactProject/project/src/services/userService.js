// src/services/userService.js
const API_BASE = "http://localhost:8081";

// 取得角色選項
export const fetchRoles = async () => {
  const res = await fetch(`${API_BASE}/user/role`, { credentials: "include" });
  if (!res.ok) throw new Error("無法取得角色清單");
  return res.json();
};

// 取得使用者列表
export const fetchUsers = async () => {
  const res = await fetch(`${API_BASE}/user/List`, { credentials: "include" });
  if (!res.ok) throw new Error("無法取得使用者資料");
  return res.json();
};

// 新增使用者
export const addUser = async (payload) => {
  const res = await fetch(`${API_BASE}/user/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.message || "新增失敗");
  return data;
};

// 修改使用者
export const updateUser = async (payload) => {
  const res = await fetch(`${API_BASE}/user/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.message || "修改失敗");
  return data;
};

// 刪除使用者
export const deleteUser = async (userId) => {
  const res = await fetch(`${API_BASE}/user/${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.message || "刪除失敗");
  return data;
};
