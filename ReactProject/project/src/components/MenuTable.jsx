import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

const PAGE_SIZE = 10;

const MenuTable = ({ menuList, onEdit, onRemove }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(menuList.length / PAGE_SIZE));

  // 取得目前頁面的資料
  const currentData = menuList.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="menu-table-container">
      <table className="menu-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>餐廳名稱</th>
            <th>餐點名稱</th>
            <th>描述</th>
            <th>價格</th>
            <th>上架狀態</th>
            <th>編輯</th>
            <th>上/下架</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.value}>
              <td>{item.value}</td>
              <td>{item.shopName}</td>
              <td>{item.text}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td>
                <span
                  className={`menu-status ${
                    item.status === "上架" ? "up" : "down"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <Button
                  className="menu-action-btn"
                  color="blue"
                  icon="edit"
                  content="編輯"
                  onClick={() => onEdit(item)}
                />
              </td>
              <td>
                <Button
                  className="menu-action-btn"
                  color={item.status === "上架" ? "red" : "green"}
                  icon={item.status === "上架" ? "arrow down" : "arrow up"}
                  content={item.status === "上架" ? "下架" : "上架"}
                  onClick={() => onRemove(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 分頁控制 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          gap: 16,
        }}
      >
        <Button
          icon
          labelPosition="left"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <Icon name="chevron left" />
          上一頁
        </Button>
        <span style={{ fontWeight: 500 }}>
          {currentPage} / {totalPages}
        </span>
        <Button
          icon
          labelPosition="right"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          下一頁
          <Icon name="chevron right" />
        </Button>
      </div>
    </div>
  );
};

export default MenuTable;
