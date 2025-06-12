// src/components/UserTable.jsx
import { Table, Button, Label } from 'semantic-ui-react';

const UserTable = ({
  users,
  onEdit,
  onDelete,
  getRoleName,
  formatDate
}) => (
  <Table compact celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>使用者ID</Table.HeaderCell>
        <Table.HeaderCell>使用者姓名</Table.HeaderCell>
        <Table.HeaderCell>使用者權限</Table.HeaderCell>
        <Table.HeaderCell>狀態</Table.HeaderCell>
        <Table.HeaderCell>建立時間</Table.HeaderCell>
        <Table.HeaderCell>操作</Table.HeaderCell>
        <Table.HeaderCell>刪除</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {users.map(user => (
        <Table.Row key={user.userId}>
          <Table.Cell>{user.userId}</Table.Cell>
          <Table.Cell>{user.userName}</Table.Cell>
          <Table.Cell>{getRoleName(user.userRole)}</Table.Cell>
          <Table.Cell>
            <Label
              color={user.status ? 'green' : 'red'}
              size="large"
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '10px 22px',
                borderRadius: 10,
                letterSpacing: 2
              }}
              horizontal
            >
              {user.status ? '啟用' : '停用'}
            </Label>
          </Table.Cell>
          <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
          <Table.Cell>
            <Button
              color="blue"
              size="large"
              icon="edit"
              content="修改"
              onClick={() => onEdit(user)}
              style={{ fontWeight: 600, borderRadius: 8 }}
            />
          </Table.Cell>
          <Table.Cell>
            <Button
              color="red"
              size="large"
              icon="trash"
              content="刪除"
              onClick={() => onDelete(user.userId)}
              style={{ fontWeight: 600, borderRadius: 8 }}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default UserTable;
