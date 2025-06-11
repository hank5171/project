// services/menuService.js
const API_URL = "http://localhost:8081";

export const fetchMenuList = async () => {
  const res = await fetch(`${API_URL}/menu/List`, { credentials: "include" });
  return res.json();
};

export const fetchShopList = async () => {
  const res = await fetch(`${API_URL}/shop`, { credentials: "include" });
  return res.json();
};

export const addOrUpdateMenu = async (payload, updateOpen, menuId) => {
  let url = `${API_URL}/menu/add`;
  let method = "POST";
  if (updateOpen && menuId) {
    url = `${API_URL}/menu/update/${menuId}`;
    method = "PUT";
  }
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res;
};

export const toggleMenuStatus = async (menuId) => {
  const res = await fetch(`${API_URL}/menu/${menuId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ menuId }),
  });
  return res;
};
