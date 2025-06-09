import { useState, useEffect } from 'react';
import { Container, Segment, Header, Icon, Message, Table, Loader } from 'semantic-ui-react';

const API_BASE = 'http://localhost:8081';

function MenuHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/order/menuHistory`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('無法取得訂單資料');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, []);

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
