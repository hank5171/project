import { useState, useEffect } from 'react';
import { Container, Segment, Header, Icon, Message, Table, Loader } from 'semantic-ui-react';
import { fetchMenuHistory } from '../services/menuHistoryService';
import { checkLoginStatus } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function MenuHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 先檢查登入狀態
    checkLoginStatus()
      .then(data => {
        if (!data.status) {
          setIsLoggedIn(false);
          setLoading(false);
          // 可選擇自動導向登入頁
          // navigate('/login');
        } else {
          // 已登入才撈訂單
          fetchMenuHistory()
            .then(data => {
              setOrders(data);
              setLoading(false);
            })
            .catch(err => {
              setErrorMsg(err.message);
              setLoading(false);
            });
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setLoading(false);
      });
  }, [navigate]);

  if (!isLoggedIn && !loading) {
    return (
      <Container>
        <Segment>
          <Message warning>
            <Message.Header>尚未登入</Message.Header>
            <p>請先登入才能查看訂單歷史。</p>
          </Message>
        </Segment>
      </Container>
    );
  }

  return (
    <Container>
      <Segment>
        <Header as='h2' icon textAlign='center'>
          <Icon name='history' circular />
          <Header.Content>訂單歷史</Header.Content>
        </Header>
        {loading ? (
          <Loader active inline='centered'>載入中...</Loader>
        ) : errorMsg ? (
          <Message negative>
            <Message.Header>錯誤</Message.Header>
            <p>{errorMsg}</p>
          </Message>
        ) : orders.length === 0 ? (
          <Message info>
            <Message.Header>尚無訂單紀錄</Message.Header>
            <p>您尚未有任何點餐紀錄。</p>
          </Message>
        ) : (
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>餐點名稱</Table.HeaderCell>
                <Table.HeaderCell>數量</Table.HeaderCell>
                <Table.HeaderCell>單價</Table.HeaderCell>
                <Table.HeaderCell>總價格</Table.HeaderCell>
                <Table.HeaderCell>備註</Table.HeaderCell>
                <Table.HeaderCell>建立時間</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {orders.map((orderArray, index) => {
                const [
                  name, 
                  description,
                  quantity,
                  price,
                  totalPrice,
                  customized,
                  createdAt
                ] = orderArray;
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{quantity}</Table.Cell>
                    <Table.Cell>${price}</Table.Cell>
                    <Table.Cell>${totalPrice}</Table.Cell>
                    <Table.Cell>{customized || '無'}</Table.Cell>
                    <Table.Cell>
                      {new Date(createdAt).toLocaleString()}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </Segment>
    </Container>
  );
}

export default MenuHistory;
