import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Dropdown, Container, Header } from 'semantic-ui-react';

const statusOptions = [
  { key: true, text: '啟用', value: true },
  { key: false, text: '停用', value: false }
];

const UserCreateForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [status, setStatus] = useState(true);
  const [roleOptions, setRoleOptions] = useState([]);

  // 取得角色選項
  useEffect(() => {
    fetch('http://localhost:8081/user/role', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const options = data.map(role => ({
          key: role.roleId,
          text: role.roleName,
          value: role.roleId
        }));
        setRoleOptions(options);
      })
      .catch(err => {
        console.error('取得角色選項失敗', err);
        alert('無法取得角色清單');
      });
  }, []);


   // 新增：取得使用者列表
  const fetchUsers = () => {
    setUsersLoading(true);
    fetch('http://localhost:8081/user/List', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('取得使用者失敗');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setUsersLoading(false);
      })
      .catch(err => {
        setUsersError(err.message);
        setUsersLoading(false);
      });
  };

  const handleSubmit = async () => {
    if (!username || !password || userRole === '') {
      alert('請填寫所有欄位');
      return;
    }

    const payload = {
      username,
      password,
      userRole,
      status
    };

    try {
      const res = await fetch('http://localhost:8081/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        alert('使用者新增成功');
        setUsername('');
        setPassword('');
        setUserRole('');
        setStatus(true);
      } else {
        alert(`新增失敗：${data.message || '未知錯誤'}`);
      }
    } catch (error) {
      console.error('新增使用者時發生錯誤:', error);
      alert('新增使用者失敗，請稍後再試');
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">新增使用者</Header>
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
        <Button type="reset" color="red" onClick={() => {
          setUsername('');
          setPassword('');
          setUserRole('');
          setStatus(true);
        }}>重設</Button>
      </Form>

      <Form style={{ marginTop: '2em' }}>
        <Header as="h3">注意事項</Header>
        <p>1. 使用者名稱和密碼長度限制為10個字元。</p>
        <p>2. 角色選項會從後端取得，請確保後端服務正常運作。</p>
        <p>3. 狀態選項可選擇啟用或停用，停用的使用者將無法登入系統。</p>
      </Form>
      
      <Form>
        
      </Form>


    </Container>
      
  );
};

export default UserCreateForm;
