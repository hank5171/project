// src/components/FilterableMenuTable.jsx
import { Table, Button } from 'semantic-ui-react';

function FilterableMenuTable({ menuList, filter, onEdit, onRemove }) {
  // 根據 filter 處理資料
  const filteredList = filter
    ? menuList.filter(item => {
        // 假設 filter 是 { status: '上架', shopName: 'xxx' }
        return Object.entries(filter).every(([key, value]) => item[key] === value);
      })
    : menuList;

  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>餐廳名稱</Table.HeaderCell>
          <Table.HeaderCell>餐點名稱</Table.HeaderCell>
          <Table.HeaderCell>描述</Table.HeaderCell>
          <Table.HeaderCell>價格</Table.HeaderCell>
          <Table.HeaderCell>上架狀態</Table.HeaderCell>
          <Table.HeaderCell>操作</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredList.map(item => (
          <Table.Row key={item.menuId}>
            <Table.Cell>{item.shopName}</Table.Cell>
            <Table.Cell>{item.menuName}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell>${item.price}</Table.Cell>
            <Table.Cell>{item.status ? '上架' : '下架'}</Table.Cell>
            <Table.Cell>
              <Button size="small" color="blue" onClick={() => onEdit(item)}>編輯</Button>
              <Button size="small" color={item.status ? "red" : "green"} onClick={() => onRemove(item)}>
                {item.status ? '下架' : '上架'}
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default FilterableMenuTable;
