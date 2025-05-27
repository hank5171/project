export async function fetchWithAuth(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    window.location.href = "/login"; // 導向登入
    return null;
  }

  return res.json();
}
