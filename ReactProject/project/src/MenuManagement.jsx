import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Input, Button, Container, Header, TextArea, Table, Message } from 'semantic-ui-react';

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
        // const activeItems = data.filter(item => item.status === true); // 只顯示上架的菜單
        // const MenuList = activeItems.map(item => ({
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
        console.log(ShopOptions);
        setShopOptions(ShopOptions);
      });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    fetchShops();
  }, []);

  // 新增菜單表單送出
  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!restaurantName || !menuName || !price) {
      setErrorMsg('請填寫所有必填欄位');
      return;
    }
    const payload = {
      restaurantName,
      name: menuName,
      price: parseInt(price, 10),
      status,
      description
    };
    try {
      const res = await fetch(`${API_URL}/menu/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg('新增菜單成功！');
        setshopName('');
        setMenuName('');
        setPrice('');
        setStatus(true);
        setDescription('');
        fetchMenu(); // 重新載入菜單
      } else {
        const data = await res.json();
        setErrorMsg(data.message || '新增失敗');
      }
    } catch (err) {
      setErrorMsg('系統錯誤，請稍後再試');
    }
  };

  // // 下架菜單
  // const handleRemove = async (item) => {
  //   fetch(`${API_URL}/menu/${item.value}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //     body: JSON.stringify({ menuId: item.value })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setSuccessMsg('菜單已下架');
  //         fetchMenu(); // 重新載入菜單
  //       } else {
  //         setErrorMsg(data.message || '下架失敗');
  //       }
  //     })
  //     .catch(() => {
  //       console.error(item);
  //       setErrorMsg('系統錯誤，請稍後再試');
  //     });
  // }
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
    // 只處理有內容的情況
    return res.headers.get('content-length') === '0' || res.status === 204
      ? null
      : res.json();
  })
  .then(data => {
    if (!data) {
      setSuccessMsg('菜單已下架');
      fetchMenu();
      return;
    }
    if (data.success) {
      setSuccessMsg('菜單已下架');
      fetchMenu();
    } else {
      setErrorMsg(data.message || '下架失敗');
    }
  })
  .catch(() => {
    setErrorMsg('系統錯誤，請稍後再試');
  })};


  const handleEdit = (item) => {
    setMenuId(item.value);
    setshopName(item.shopName);
    setMenuName(item.text);
    setPrice(item.price);
    setStatus(item.status === '上架');
    setDescription(item.description || '');
    setUpdateOpen(true);
  }

  const handleEditCancel = () => {
    setMenuId('');
    setshopName('');
    setMenuName('');
    setPrice('');
    setStatus(true);
    setDescription('');
    setUpdateOpen(false);
  }

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">菜單管理</Header>

      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>ID</label>
            <Input
              readOnly
              disabled
              placeholder="ID"
              value={menuId}
              onChange={e => setMenuId(e.target.value)}
            />
          </Form.Field>
          <Form.Field required>
            <label>餐廳名稱</label>
            <select
              value={shopName}
              onChange={e => setshopName(e.target.value)}
            >
            <option value="">請選擇餐廳名稱</option>
            {shopOptions.map(option => (
              <option key={option.key} value={option.value}>
                {option.text}
              </option>
            ))}
            </select>
          </Form.Field>
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
          <Form.Field>
            <label>上架狀態</label>
            <Dropdown
              selection
              options={[
                { key: true, value: true, text: '上架' },
                { key: false, value: false, text: '下架' }
              ]}
              value={status}
              onChange={(e, { value }) => setStatus(value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>描述</label>
          <TextArea
            placeholder="可輸入餐點描述"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Field>
        {updateOpen && (
          <Button type="submit" color="green">更新菜單</Button>
        )}
        {!updateOpen && (
          <Button type="submit" color="green">新增菜單</Button>
        )}
         {updateOpen && (
        <Button type="button" onClick={handleEditCancel} color="red">取消編輯</Button>
         )}
        {errorMsg && <Message negative>{errorMsg}</Message>}
        {successMsg && <Message positive>{successMsg}</Message>}
      </Form>

      <Table compact celled style={{ marginTop: '2em' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>餐廳ID</Table.HeaderCell>
            <Table.HeaderCell>餐廳名稱</Table.HeaderCell>
            <Table.HeaderCell>餐點名稱</Table.HeaderCell>
            <Table.HeaderCell>描述</Table.HeaderCell>
            <Table.HeaderCell>價格</Table.HeaderCell>
            <Table.HeaderCell>上架狀態</Table.HeaderCell>
            <Table.HeaderCell>編輯</Table.HeaderCell>
            <Table.HeaderCell>下架</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {menuList.map((item) => (
            <Table.Row key={item.value}>
              <Table.Cell readOnly>{item.value}</Table.Cell>
              <Table.Cell>{item.shopName}</Table.Cell>
              <Table.Cell>{item.text}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>${item.price}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>
                <Button primary onClick={() => handleEdit(item)}>編輯</Button>
              </Table.Cell>
              <Table.Cell>
                <Button negative onClick={() => handleRemove(item)}>下架</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default MenuManagement;
