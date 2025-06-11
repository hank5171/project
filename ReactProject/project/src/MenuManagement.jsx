import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Input, Button, TextArea, Message, Modal } from 'semantic-ui-react';
import './css/Menu.css'; // 引入自訂 CSS

const MenuManagement = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [shopName, setshopName] = useState('');
  const [menuName, setMenuName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [updateOpen, setUpdateOpen] = useState(false);
  const [menuId, setMenuId] = useState('');
  const [shopOptions, setShopOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const API_URL = 'http://localhost:8081';

  // 取得使用者資訊
  useEffect(() => {
    fetch(`${API_URL}/check-login`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  }, []);

  // 取得菜單
  const fetchMenu = () => {
    fetch(`${API_URL}/menu/List`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const MenuList = data.map(item => ({
          key: item.menuId,
          value: item.menuId,
          text: `${item.menuName}`,
          description: item.description,
          price: item.price,
          status: item.status ? '上架' : '下架',
          shopName: item.shopName,
        }));
        setMenuList(MenuList);
      });
  };

  // 取得餐廳列表
  const fetchShops = () => {
    fetch(`${API_URL}/shop`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const ShopOptions = data.map(item => ({
          key: item.shopId,
          value: item.shopName,
          text: item.shopName
        }));
        setShopOptions(ShopOptions);
      });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    fetchShops();
  }, []);

  // 新增菜單時清空表單並開啟 Modal
  const handleAddNew = () => {
    setMenuId('');
    setshopName('');
    setMenuName('');
    setPrice('');
    setStatus(true);
    setDescription('');
    setUpdateOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
    setModalOpen(true);
  };

  // 編輯菜單
  const handleEdit = (item) => {
    setMenuId(item.value);
    setshopName(item.shopName);
    setMenuName(item.text);
    setPrice(item.price);
    setStatus(item.status === '上架');
    setDescription(item.description || '');
    setUpdateOpen(true);
    setErrorMsg('');
    setSuccessMsg('');
    setModalOpen(true);
  };

  // 關閉 Modal 並清空表單
  const handleEditCancel = () => {
    setMenuId('');
    setshopName('');
    setMenuName('');
    setPrice('');
    setStatus(true);
    setDescription('');
    setUpdateOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
    setModalOpen(false);
  };

  // 新增或更新菜單表單送出
  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!shopName || !menuName || !price) {
      setErrorMsg('請填寫所有必填欄位');
      return;
    }
    const payload = {
      shopName,
      menuName,
      price: parseInt(price, 10),
      status,
      description
    };
    try {
      let url = `${API_URL}/menu/add`;
      let method = 'POST';
      if (updateOpen && menuId) {
        url = `${API_URL}/menu/update/${menuId}`;
        method = 'PUT';
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg(updateOpen ? '更新菜單成功！' : '新增菜單成功！');
        fetchMenu();
        setTimeout(() => {
          handleEditCancel();
        }, 800);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || (updateOpen ? '更新失敗' : '新增失敗'));
      }
    } catch (err) {
      setErrorMsg('系統錯誤，請稍後再試');
    }
  };

  // 下架或上架菜單
  const handleRemove = async (item) => {
    fetch(`${API_URL}/menu/${item.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ menuId: item.value })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('HTTP error ' + res.status);
        }
        return res.headers.get('content-length') === '0' || res.status === 204
          ? null
          : res.json();
      })
      .then(data => {
        fetchMenu();
      })
      .catch(() => {
        setErrorMsg('系統錯誤，請稍後再試');
      });
  };

  return (
    <div className="menu-container">
      <div className="menu-header">菜單管理</div>
      <div className="menu-table-area">
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
                    onClick={() => handleEdit(item)}
                  />
                </td>
                <td>
                  <Button
                    className="menu-action-btn"
                    color={item.status === '上架' ? 'red' : 'green'}
                    icon={item.status === '上架' ? 'arrow down' : 'arrow up'}
                    content={item.status === '上架' ? '下架' : '上架'}
                    onClick={() => handleRemove(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          className="menu-add-btn"
          color="green"
          icon="plus"
          content="新增菜單"
          onClick={handleAddNew}
        />
      </div>
      <Modal
        open={modalOpen}
        onClose={handleEditCancel}
        size="small"
        closeIcon
      >
        <Modal.Header style={{ fontWeight: 'bold', fontSize: '1.3em', letterSpacing: '2px' }}>
          {updateOpen ? '編輯菜單' : '新增菜單'}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={e => { e.preventDefault(); handleSubmit(); }} style={{ padding: '1em 1.5em' }}>
            <Form.Group widths={2}>
              <Form.Field>
                <label>ID</label>
                <Input
                  readOnly
                  disabled
                  placeholder="ID"
                  value={menuId}
                  style={{ background: '#f5f5f5' }}
                />
              </Form.Field>
              <Form.Field required>
                <label>餐廳名稱</label>
                <Dropdown
                  placeholder="請選擇餐廳名稱"
                  fluid
                  selection
                  options={shopOptions}
                  value={shopName}
                  onChange={(e, { value }) => setshopName(value)}
                  style={{ minWidth: 0 }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field required>
                <label>餐點名稱</label>
                <Input
                  placeholder="請輸入餐點名稱"
                  value={menuName}
                  onChange={e => setMenuName(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>價格</label>
                <Input
                  type="number"
                  min="0"
                  placeholder="請輸入價格"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field>
                <label>上架狀態</label>
                <Dropdown
                  fluid
                  selection
                  options={[
                    { key: true, value: true, text: '上架' },
                    { key: false, value: false, text: '下架' }
                  ]}
                  value={status}
                  onChange={(e, { value }) => setStatus(value)}
                  style={{ minWidth: 0 }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>描述</label>
              <TextArea
                placeholder="可輸入餐點描述"
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ minHeight: 80 }}
              />
            </Form.Field>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1em', marginTop: '1.5em' }}>
              <Button type="submit" color="green" size="large">
                {updateOpen ? '更新菜單' : '新增菜單'}
              </Button>
              <Button type="button" onClick={handleEditCancel} color="red" size="large">
                取消
              </Button>
            </div>
            {errorMsg && <Message negative style={{ marginTop: '1em' }}>{errorMsg}</Message>}
            {successMsg && <Message positive style={{ marginTop: '1em' }}>{successMsg}</Message>}
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default MenuManagement;
