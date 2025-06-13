import React, { useState } from "react";
import "../css/shopTable.css";

const ShopTable = ({ shops, onEdit }) => {
  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(shops.length / pageSize));

  // 取得當前頁的資料
  const currentData = shops.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="table-container">
      <table className="shop-table">
        <thead>
          <tr>
            <th>店家名稱</th>
            <th>電話</th>
            <th>地址</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.shopName}</td>
              <td>{shop.tel}</td>
              <td>{shop.shopAddress}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(shop)}>
                  編輯
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 分頁按鈕 */}
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          上一頁
        </button>
        <span className="page-info">
          {currentPage} / {totalPages}
        </span>
        <button
          className="page-btn"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          下一頁
        </button>
      </div>
    </div>
  );
};

export default ShopTable;
