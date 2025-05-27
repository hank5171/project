import { useEffect, useState } from 'react';
import { Container, Header, Message } from 'semantic-ui-react';

const API_BASE = 'http://localhost:8081';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/check-login`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      console.log("登入狀態回傳", data);

      if (data.status) {
        setIsLoggedIn(true);
        setUsername(data.username); // 確保後端有回傳 username
        console.log("使用者名稱：", data.username);
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    } catch (error) {
      console.error("無法確認登入狀態", error);
    }
  };

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      {isLoggedIn ? (
        <>
          <Header as="h2">歡迎，{username}！</Header>
          <p>這是首頁</p>
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
