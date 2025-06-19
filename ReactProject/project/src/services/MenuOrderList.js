const API_BASE = "http://localhost:8081";

// 打請求存取留言
export const getOrderList = async (comment) => {
  const res = await fetch(`${API_BASE}/order/orderList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
    credentials: "include",
  });
  if (!res.ok) throw new Error("無法取得列表");
  return res.json();
};
