const API_BASE = "http://localhost:8081";

// 打請求存取留言
export const postMenuComment = async (comment) => {
  const res = await fetch(`${API_BASE}/message/menuPost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
    credentials: "include",
  });
  if (!res.ok) throw new Error("無法送出留言");
  return res.json();
};
