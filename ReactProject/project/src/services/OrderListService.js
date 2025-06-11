// src/services/OrderListService.js
const API_BASE = "http://localhost:8081";

// 取得登入使用者資訊
// export const fetchUserInfo = async () => {
//   const res = await fetch(`${API_BASE}/check-login`, {
//     credentials: "include",
//   });
//   if (!res.ok) throw new Error("無法取得使用者資訊");
//   return res.json();
// };

// 取得菜單（僅回傳上架菜單）
export const fetchMenuOptions = async () => {
  const res = await fetch(`${API_BASE}/menu`, { credentials: "include" });
  if (!res.ok) throw new Error("無法取得菜單");
  const data = await res.json();
  return data
    .filter((item) => item.status === true)
    .map((item) => ({
      key: item.menuId,
      value: item.menuId,
      text: `${item.name} - ${item.description} - $${item.price}`,
      price: item.price,
    }));
};

// 送出訂單
export const submitOrder = async (payload) => {
  const res = await fetch(`${API_BASE}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "訂單送出失敗");
  return data;
};
