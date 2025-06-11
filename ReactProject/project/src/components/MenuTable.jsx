// components/MenuTable.jsx
import { Button } from 'semantic-ui-react';

const MenuTable = ({ menuList, onEdit, onRemove }) => (
  <table className="menu-table">
    <thead>
      <tr>
        <th>餐廳ID</th>
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
      {menuList.map((item) => (
        <tr key={item.value}>
          <td>{item.value}</td>
          <td>{item.shopName}</td>
          <td>{item.text}</td>
          <td>{item.description}</td>
          <td>${item.price}</td>
          <td>
            <span className={`menu-status ${item.status === '上架' ? 'up' : 'down'}`}>
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
              color={item.status === '上架' ? 'red' : 'green'}
              icon={item.status === '上架' ? 'arrow down' : 'arrow up'}
              content={item.status === '上架' ? '下架' : '上架'}
              onClick={() => onRemove(item)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MenuTable;
