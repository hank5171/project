import { useEffect, useState } from 'react';
import { Container, Header, Message } from 'semantic-ui-react';
import { checkLoginStatus } from '../services/authService';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkLoginStatus()
      .then(data => {
        if (data.status) {
          setIsLoggedIn(true);
          setUsername(data.username);
        } else {
          setIsLoggedIn(false);
          setUsername('');
        }
      })
      .catch(error => {
        console.error("無法確認登入狀態", error);
      });
  }, []);

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      {isLoggedIn ? (
        <>
          <Header as="h2">{username} 歡迎使用點餐系統</Header>
          <Message info>
            <Message.Header>系統資訊</Message.Header>
            <p>這裡可以顯示一些系統的最新消息或提示。</p>
          </Message>
        </>
      ) : (
        <Message warning>
          <Message.Header>尚未登入</Message.Header>
          <p>請先登入才能看到首頁內容</p>
        </Message>
      )}
    </Container>
  );
}

export default Home;
