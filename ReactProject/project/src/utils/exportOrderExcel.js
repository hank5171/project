// src/utils/exportOrderExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function handleExport({
  filtered,
  totalQuantity,
  totalPrice,
  shopStats,
}) {
  const sorted = [...filtered].sort((a, b) => {
    // 依 username 升冪排序
    if (a.username < b.username) return -1;
    if (a.username > b.username) return 1;
    return 0;
  });

  const headers = [
    "使用者名稱",
    "餐廳名稱",
    "餐點名稱",
    "數量",
    "單價",
    "總價",
    "備註",
    "建立日期",
  ];

  // 用 array of array 方式確保欄位順序
  const exportData = [
    ...sorted.map((list) => [
      list.username,
      list.shopname,
      list.name,
      list.quantity,
      list.price,
      list.totalprice,
      list.customized,
      list.created_at,
    ]),
    ["", "", "合計", totalQuantity, "", totalPrice, "", ""],
    ["", "", "", "", "", "", "", ""],
  ];

  Object.entries(shopStats).forEach(([shopname, { tel, items }]) => {
    exportData.push(["", shopname, tel, "", "", "", "", ""]);
    Object.entries(items).forEach(([dish, stat]) => {
      const avgPrice =
        stat.count > 0 ? Math.round(stat.priceSum / stat.count) : "";
      exportData.push([
        "",
        "",
        dish,
        stat.quantity,
        avgPrice,
        stat.totalPrice,
        "",
        "",
      ]);
    });
    exportData.push(["", "", "", "", "", "", "", ""]);
  });

  const ws = XLSX.utils.aoa_to_sheet([headers, ...exportData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "訂單列表");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "訂單總覽.xlsx");
}
