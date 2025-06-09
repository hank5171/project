import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Input, Button, Container, Header, TextArea, Table, Message } from 'semantic-ui-react';

const MenuManagement = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [menuName, setMenuName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 取得使用者資訊
  useEffect(() => {
    fetch('http://localhost:8081/check-login', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  }, []);

  // 取得菜單
  const fetchMenu = () => {
    fetch('http://localhost:8081/menu', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const activeItems = data.filter(item => item.status === true);
        const MenuList = activeItems.map(item => ({
          key: item.menuId,
          value: item.menuId,
          text: `${item.name}`,
          price: item.price,
          status: item.status ? '上架' : '下架',
          restaurantName: item.restaurantName,
        }));
        setMenuList(MenuList);
      });
  };

  useEffect(() => {
    fetchMenu();
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
      const res = await fetch('http://localhost:8081/menu/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg('新增菜單成功！');
        setRestaurantName('');
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

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">菜單管理</Header>

      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>餐廳名稱</label>
            <Input
              placeholder="請輸入餐廳名稱"
              value={restaurantName}
              onChange={e => setRestaurantName(e.target.value)}
            />
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
        <Button type="submit" color="green">新增菜單</Button>
        {errorMsg && <Message negative>{errorMsg}</Message>}
        {successMsg && <Message positive>{successMsg}</Message>}
      </Form>

      <Table compact celled style={{ marginTop: '2em' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>餐廳名稱</Table.HeaderCell>
            <Table.HeaderCell>餐點名稱</Table.HeaderCell>
            <Table.HeaderCell>價格</Table.HeaderCell>
            <Table.HeaderCell>上架狀態</Table.HeaderCell>
            <Table.HeaderCell>編輯</Table.HeaderCell>
            <Table.HeaderCell>下架</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {menuList.map((item) => (
            <Table.Row key={item.value}>
              <Table.Cell>{item.restaurantName}</Table.Cell>
              <Table.Cell>{item.text}</Table.Cell>
              <Table.Cell>${item.price}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>
                <Button primary>編輯</Button>
              </Table.Cell>
              <Table.Cell>
                <Button negative>下架</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default MenuManagement;
