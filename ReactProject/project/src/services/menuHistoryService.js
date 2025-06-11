// src/services/menuHistoryService.js
const API_BASE = "http://localhost:8081";

export const fetchMenuHistory = async () => {
  const res = await fetch(`${API_BASE}/order/menuHistory`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("無法取得訂單資料");
  return res.json();
};
