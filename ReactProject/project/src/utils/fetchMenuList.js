export const fetchMenuList = async () => {
  const res = await fetch(`${API_BASE}/menu/list`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("取得菜單列表失敗");
  const data = await res.json();
  return data.map((item) => ({
    key: item.menuId,
    value: item.menuId,
    text: `${item.menuName}`,
    description: item.description,
    price: item.price,
    status: item.status ? "上架" : "下架",
    shopName: item.shopName,
    shopId: item.shopId,
  }));
};
