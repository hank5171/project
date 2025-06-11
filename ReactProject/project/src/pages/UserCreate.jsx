// src/pages/UserCreate.jsx
import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Dropdown,
  Container,
  Header,
  Table,
  Icon,
  Label,
  Loader,
  Message,
  Modal
} from 'semantic-ui-react';
import {
  fetchRoles,
  fetchUsers,
  addUser,
  updateUser,
  deleteUser
} from '../services/userService';

const statusOptions = [
  { key: true, text: '啟用', value: true },
  { key: false, text: '停用', value: false }
];

const UserCreate = () => {
  // Modal 狀態
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  // 表單狀態
  const [editingUserId, setEditingUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [status, setStatus] = useState(true);
  const [roleOptions, setRoleOptions] = useState([]);
  // 使用者列表狀態
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 取得角色選項
  useEffect(() => {
    fetchRoles()
      .then(options => setRoleOptions(
        options.map(role => ({
          key: role.roleId,
          text: role.roleName,
          value: role.roleId
        }))
      ))
      .catch(err => {
        console.error('取得角色選項失敗', err);
        alert('無法取得角色清單');
      });
  }, []);

  // 取得使用者列表
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    fetchUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  // 新增使用者
  const handleSubmit = async () => {
    if (!username || !password || userRole === '') {
      alert('請填寫所有欄位');
      return;
    }
    try {
      await addUser({ username, password, userRole, status });
      alert('使用者新增成功');
      setUsername('');
      setPassword('');
      setUserRole('');
      setStatus(true);
      setOpen(false);
      loadUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  // 修改使用者
  const updateSubmit = async () => {
    try {
      await updateUser({ userId: editingUserId, username, password, userRole, status });
      alert('使用者修改成功');
      setUsername('');
      setPassword('');
      setUserRole('');
      setStatus(true);
      setOpen(false);
      setUpdateOpen(false);
      loadUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  // 角色ID轉文字
  const getRoleName = (roleId) => {
    return roleId === 1 ? '管理員' : '一般使用者';
  };

  // 格式化日期
  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 刪除使用者
  const handleDelete = async (userId) => {
    if (!window.confirm('確定要刪除這個使用者嗎？')) return;
    try {
      await deleteUser(userId);
      alert('使用者刪除成功');
      loadUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">使用者管理</Header>
      {/* 新增/修改使用者 Modal */}
      {updateOpen ? (
        <Modal
          open={open}
          onClose={() => { setOpen(false); setUpdateOpen(false); }}
          size="small"
          closeIcon
        >
          <Modal.Header>修改使用者</Modal.Header>
          <Modal.Content>
            <Form onSubmit={updateSubmit}>
              <Form.Field>
                <label>使用者ID</label>
                <Input
                  type="text"
                  maxLength={10}
                  placeholder="請輸入使用者ID"
                  value={editingUserId}
                  disabled
                  readOnly
                />
              </Form.Field>
              <Form.Field>
                <label>使用者名稱</label>
                <Input
                  type="text"
                  maxLength={10}
                  placeholder="請輸入使用者名稱"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled
                  readOnly
                />
              </Form.Field>
              <Form.Field>
                <label>修改密碼</label>
                <Input
                  type="password"
                  maxLength={10}
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>修改角色</label>
                <Dropdown
                  selection
                  placeholder="請選擇角色"
                  options={roleOptions}
                  value={userRole}
                  onChange={(e, { value }) => setUserRole(value)}
                />
              </Form.Field>
              <Form.Field>
                <label>狀態</label>
                <Dropdown
                  selection
                  options={statusOptions}
                  value={status}
                  onChange={(e, { value }) => setStatus(value)}
                />
              </Form.Field>
              <Button type="submit" color="green">修改使用者</Button>
              <Button type="button" color="grey" onClick={() => {
                setOpen(false);
                setUpdateOpen(false);
                setUsername('');
                setUserRole('');
                setStatus('');
                setPassword('');
                setEditingUserId('');
              }}>取消</Button>
            </Form>
          </Modal.Content>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="small"
          closeIcon
        >
          <Modal.Header>新增使用者</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>使用者名稱</label>
                <Input
                  type="text"
                  maxLength={10}
                  placeholder="請輸入使用者名稱"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>密碼</label>
                <Input
                  type="password"
                  maxLength={10}
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>角色</label>
                <Dropdown
                  selection
                  placeholder="請選擇角色"
                  options={roleOptions}
                  value={userRole}
                  onChange={(e, { value }) => setUserRole(value)}
                />
              </Form.Field>
              <Form.Field>
                <label>狀態</label>
                <Dropdown
                  selection
                  options={statusOptions}
                  value={status}
                  onChange={(e, { value }) => setStatus(value)}
                />
              </Form.Field>
              <Button type="submit" color="green">新增</Button>
              <Button type="button" color="grey" onClick={() => setOpen(false)}>取消</Button>
            </Form>
          </Modal.Content>
        </Modal>
      )}
      {loading ? (
        <Loader active inline='centered'>載入中...</Loader>
      ) : error ? (
        <Message negative>{error}</Message>
      ) : (
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
                  <Label color={user.status ? 'green' : 'red'} horizontal>
                    {user.status ? '啟用' : '停用'}
                  </Label>
                </Table.Cell>
                <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                <Table.Cell>
                  <Button
                    basic
                    color="blue"
                    onClick={() => {
                      setOpen(true);
                      setUpdateOpen(true);
                      setUsername(user.userName);
                      setUserRole(user.userRole);
                      setStatus(user.status);
                      setPassword('');
                      setEditingUserId(user.userId);
                    }}>
                    修改
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button basic color="red" onClick={() => handleDelete(user.userId)}>刪除</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="6">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  color="teal"
                  size="small"
                  onClick={() => setOpen(true)}
                  style={{ marginBottom: '0.1em' }}
                >
                  <Icon name="add user" /> 新增使用者
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )}
      <Form style={{ marginTop: '2em' }}>
        <Header as="h3">注意事項</Header>
        <p>1. 使用者名稱和密碼長度限制為10個字元。</p>
        <p>2. 角色選項會從後端取得，請確保後端服務正常運作。</p>
        <p>3. 狀態選項可選擇啟用或停用，停用的使用者將無法登入系統。</p>
      </Form>
    </Container>
  );
};

export default UserCreate;
