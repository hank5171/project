import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Button, Container, Header, TextArea, Segment, Message, Icon } from 'semantic-ui-react';
import { checkLoginStatus } from '../services/authService';
import {
  fetchMenuOptions,
  submitOrder
} from '../services/OrderListService';
import '../css/Menu.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customized, setCustomized] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // 取得使用者資訊
  useEffect(() => {
    checkLoginStatus()
      .then(data => setUserInfo(data))
      .catch(err => setErrorMsg('取得使用者資訊失敗：' + err.message));
  }, []);

  // 取得菜單
  useEffect(() => {
    fetchMenuOptions()
      .then(options => setMenuOptions(options))
      .catch(err => setErrorMsg('取得菜單失敗：' + err.message));
  }, []);

  const handleSubmit = async () => {
    setSuccessMsg('');
    setErrorMsg('');
    if (!userInfo || !selectedMenuId || !quantity) {
      setErrorMsg('請填寫所有欄位');
      return;
    }

    const menuItem = menuOptions.find(item => item.value === selectedMenuId);
    const price = menuItem ? parseInt(menuItem.price) : 0;
    const totalPrice = price * parseInt(quantity);

    const payload = {
      userId: userInfo.userId,
      menuId: selectedMenuId,
      quantity: parseInt(quantity),
      price: price,
      totalPrice: totalPrice,
      customized: customized,
    };

    try {
      await submitOrder(payload);
      setSuccessMsg('訂單送出成功！');
      setSelectedMenuId('');
      setQuantity('');
      setCustomized('');
      setTimeout(() => {
        navigate('/menuHistory');
      }, 1000);
    } catch (err) {
      setErrorMsg('送出錯誤：' + err.message);
    }
  };

  return (
    <Container className="orderlist-container">
      <Segment className="orderlist-segment" padded="very" raised>
        <Header as="h2" icon textAlign="center" className="orderlist-header">
          <Icon name="food" circular />
          <Header.Content>訂單建立</Header.Content>
        </Header>
        <Form className="orderlist-form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          <Form.Field>
            <label>選擇餐點</label>
            <Dropdown
              placeholder="請選擇餐點"
              fluid
              selection
              options={menuOptions}
              value={selectedMenuId}
              onChange={(e, { value }) => setSelectedMenuId(value)}
              className="orderlist-dropdown"
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
              className="orderlist-dropdown"
            />
          </Form.Field>
          <Form.Field>
            <label>客製化需求</label>
            <TextArea
              placeholder="可輸入特殊需求"
              value={customized}
              onChange={(e) => setCustomized(e.target.value)}
              className="orderlist-textarea"
              style={{ minHeight: 60 }}
            />
          </Form.Field>
          <Button type="submit" color="blue" size="large" className="orderlist-btn">
            <Icon name="send" /> 送出
          </Button>
          {successMsg && <Message positive style={{ marginTop: 16 }}>{successMsg}</Message>}
          {errorMsg && <Message negative style={{ marginTop: 16 }}>{errorMsg}</Message>}
        </Form>
      </Segment>
    </Container>
  );
};

export default Menu;
