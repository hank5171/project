import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Input, Button, Container, Header, TextArea } from 'semantic-ui-react';

const OrderList = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customized, setCustomized] = useState('');

  // 取得使用者資訊
  useEffect(() => {
    fetch('http://localhost:8081/check-login', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log('登入狀態回傳', data);
        setUserInfo(data);
      });
  }, []);

  // 取得菜單
  useEffect(() => {
    fetch('http://localhost:8081/menu', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const activeItems = data.filter(item => item.status === true);
        const options = activeItems.map(item => ({
          key: item.menuId,
          value: item.menuId,
          text: `${item.name} - ${item.description} - $${item.price}`,
        }));
        setMenuOptions(options);
      });
  }, []);

  const handleSubmit = async () => {
    if (!userInfo || !selectedMenuId || !quantity) {
      alert('請填寫所有欄位');
      return;
    }

    const payload = {
      userId: userInfo.userId,
      menuId: selectedMenuId,
      quantity: parseInt(quantity),
      customized: customized,
    };

    console.log('送出訂單資料:', payload);

    try {
      const res = await fetch('http://localhost:8081/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert('訂單送出成功！');
        // 清空表單
        setSelectedMenuId('');
        setQuantity('');
        setCustomized('');
      } else {
        alert(`送出失敗：${data.message}`);
      }
    } catch (err) {
      alert('送出錯誤：' + err.message);
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">訂單建立</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>選擇餐點</label>
          <Dropdown
            placeholder="請選擇餐點"
            fluid
            selection
            options={menuOptions}
            value={selectedMenuId}
            onChange={(e, { value }) => setSelectedMenuId(value)}
          />
        </Form.Field>
        <Form.Field>
          <label>數量</label>
          <Dropdown
            placeholder="選擇數量"
            fluid
            selection
            options={[...Array(9)].map((_, i) => ({
            key: i + 1,
            value: i + 1,
            text: `${i + 1}`,
        }))}
            value={quantity}
            onChange={(e, { value }) => setQuantity(value)}
        />
        </Form.Field>
        <Form.Field>
          <label>客製化需求</label>
          <TextArea
            placeholder="可輸入特殊需求"
            value={customized}
            onChange={(e) => setCustomized(e.target.value)}
          />
        </Form.Field>
        <Button type="submit" color="blue">送出</Button>
      </Form>
    </Container>
  );
};

export default OrderList;
