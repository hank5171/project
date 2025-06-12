const API_BASE = "http://localhost:8081";

export const fetchShop = async () => {
  const res = await fetch(`${API_BASE}/shop`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("無法取得商店資料");
  return res.json();
};

export const addShop = async (shop) => {
  const res = await fetch(`${API_BASE}/shop/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(shop),
  });
  if (!res.ok) throw new Error("新增商店失敗");
  return res.json();
};

export const updateShop = async (shop) => {
  const res = await fetch(`${API_BASE}/shop/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(shop),
  });
  if (!res.ok) throw new Error("修改商店失敗");
  return res.json();
};
