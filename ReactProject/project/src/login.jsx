import React from 'react'
import { Form, Container, FormButton } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
const API_BASE = 'http://localhost:8081/login'


function login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({username:'', password:''});
  
  useEffect(() => { 
    console.log("檢查是否已經登入");
    checkLoginStatus();
  }, [])

  const checkLoginStatus = async () => {
    try{
      const res = await fetch(API_BASE,{credentials: 'include'}
      );
      const data = await res.json();
      console.log("data", data);
      if (data.status === 'success') {
        setIsLoggedIn(true);
        console.log("已經登入");
      } else {
        setIsLoggedIn(false);
        console.log("尚未登入");
      }
    } catch (error) {
      console.error("請確認登入狀態", error);
    }
  }


  return (
    
    <Container>
      <Form method='POST' action={API_BASE} >
        <Form.Input  
        type='text'
        name='username'
        value={account}
        label='帳號' 
        onChange={(e) => setAccount(e.target.value)} 
        placeholder='請輸入帳號' />

        <Form.Input  
        type='password'
        name='password'
        value={password}
        label='密碼' 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='請輸入密碼'/>
        
        <FormButton primary type='submit'>登入</FormButton>
      </Form>

    </Container>
  )
}

export default login