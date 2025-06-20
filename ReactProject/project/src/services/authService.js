// src/services/authService.js
const API_BASE = "http://localhost:8081";

export const checkLoginStatus = async () => {
  const res = await fetch(`${API_BASE}/check-login`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const login = async (loginForm) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(loginForm),
  });
  return res.json();
};

export const logout = async () => {
  const res = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};
