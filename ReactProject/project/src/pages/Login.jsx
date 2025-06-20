import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Segment, Header, Icon, Message } from 'semantic-ui-react';
import '../css/login.css';
import { checkLoginStatus, login } from '../services/authService';


function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus().then(data => {
      if (data.status) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginForm);
      if (data.status === 200) {
        setIsLoggedIn(true);
        alert("登入成功");
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("登入失敗，請檢查帳號密碼是否正確");
      console.error("登入錯誤", err);
    }
  };

  return (
    <div className="login-bg">
      <Container text style={{ maxWidth: 400 }}>
        <Segment raised padded="very" className="login-card">
          <Header as="h2" icon textAlign="center" style={{ color: '#4a4a4a' }}>
            <Icon name="user circle" />
            歡迎使用點餐系統
            <Header.Subheader>請輸入帳號密碼繼續</Header.Subheader>
          </Header>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="帳號"
              name="username"
              value={loginForm.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="密碼"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
            <Button fluid color="violet" size="large" type="submit">
              登入
            </Button>
          </Form>
          <Message hidden={isLoggedIn}>
            若您尚未註冊帳號，請聯繫管理員
          </Message>
        </Segment>
      </Container>
    </div>
  );
}

export default Login;
