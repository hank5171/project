import { useEffect, useState } from 'react';
import { Container, Header, Message, Grid, Button, Segment, Icon, Divider } from 'semantic-ui-react';
import { checkLoginStatus } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function NewHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

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
    <Container textAlign="center" style={{ marginTop: '5em', maxWidth: 800 }}>
      {isLoggedIn ? (
        <>
          <Header as="h2" icon>
            <Icon name="food" color="blue" />
            {username}，歡迎使用點餐系統
          </Header>

          <Segment color="blue" raised>
            <Header as="h4" icon>
              <Icon name="info circle" />
              系統公告
            </Header>
            <p>目前系統運作正常。請隨時關注最新公告與功能更新！</p>
          </Segment>

          <Divider horizontal>常用功能</Divider>
          <Grid columns={1} stackable centered>
            <Grid.Row>
              <Grid.Column>
                <Button
                  icon
                  labelPosition="left"
                  color="teal"
                  size="large"
                  onClick={() => navigate('/menu')}
                >
                  <Icon name="shopping cart" />
                  我要點餐
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider horizontal>快速導覽</Divider>
          <Segment basic>
            <p>
              你可以在這裡快速進行點餐、管理菜單與店家資訊。
              若有任何問題，請洽系統管理員。
            </p>
          </Segment>
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

export default NewHome;
