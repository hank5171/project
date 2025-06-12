// src/pages/UserCreate.jsx
import React, { useState, useEffect } from 'react';
import { Container, Header, Loader, Message, Form, Button } from 'semantic-ui-react';
import { fetchRoles, fetchUsers, addUser, updateUser, deleteUser } from '../services/userService';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';


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
      .catch(() => {
        setError('無法取得角色清單');
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

  // 新增
  const handleSubmit = async () => {
    if (!username || !password || userRole === '') {
      alert('請填寫所有欄位');
      return;
    }
    try {
      await addUser({ username, password, userRole, status });
      alert('使用者新增成功');
      resetForm();
      setOpen(false);
      loadUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  // 修改
  const updateSubmit = async () => {
    try {
      await updateUser({ userId: editingUserId, username, password, userRole, status });
      alert('使用者修改成功');
      resetForm();
      setOpen(false);
      setUpdateOpen(false);
      loadUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  // 刪除
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

  // 編輯
  const handleEdit = (user) => {
    setOpen(true);
    setUpdateOpen(true);
    setUsername(user.userName);
    setUserRole(user.userRole);
    setStatus(user.status);
    setPassword('');
    setEditingUserId(user.userId);
  };

  // Modal 關閉與重置
  const handleModalClose = () => {
    setOpen(false);
    setUpdateOpen(false);
    resetForm();
  };

  // 表單重置
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setUserRole('');
    setStatus(true);
    setEditingUserId('');
  };

  // 權限名稱顯示
  const getRoleName = (roleId) => {
    return roleId === 1 ? '管理員' : '一般使用者';
  };

  // 時間格式化
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

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">使用者管理</Header>
      {/* 新增/修改使用者 Modal */}
      <UserModal
        open={open}
        updateOpen={updateOpen}
        onClose={handleModalClose}
        onSubmit={updateOpen ? updateSubmit : handleSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        userRole={userRole}
        setUserRole={setUserRole}
        roleOptions={roleOptions}
        status={status}
        setStatus={setStatus}
        editingUserId={editingUserId}
      />
      <Button
        color="blue"
        content="＋ 新增使用者"
        icon="plus"
        style={{ marginBottom: 18, fontWeight: 600, borderRadius: 8 }}
        onClick={() => {
          setOpen(true);
          setUpdateOpen(false);
          resetForm();
        }}
      />
      {loading ? (
        <Loader active inline='centered'>載入中...</Loader>
      ) : error ? (
        <Message negative>{error}</Message>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRoleName={getRoleName}
          formatDate={formatDate}
        />
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
