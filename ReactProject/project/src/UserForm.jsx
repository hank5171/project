import { useState } from "react";
import React, { useState, useEffect } from 'react';

function UserForm(){
    const [roleOptions,setRoleOptions] = useState([]);

      // 取得角色選項
      useEffect(() => {
        fetch(`${API_BASE}/user/role`, {
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
}

    try {
      const res = await fetch(`${API_BASE}/user/add`, {
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
        fetchUsers(); // 新增成功後刷新列表
      } else {
        alert(`新增失敗：${data.message || '未知錯誤'}`);
      }
    } catch (error) {
      console.error('新增使用者時發生錯誤:', error);
      alert('新增使用者失敗，請稍後再試');
    }

    
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
  };

    return(
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
    </Container>
    )

export default UserForm;