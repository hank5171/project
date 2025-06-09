import { Form, Container, FormButton } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
const API_BASE = 'http://localhost:8081'


function loginold() {
  //const [account, setAccount] = useState('');
  //const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({username:'', password:''});
  

  // 檢查登入狀態
  useEffect(() => { 
    console.log("檢查是否已經登入");
    checkLoginStatus();
  }, [])
  
  // 檢查登入狀態的函式
  const checkLoginStatus = async () => {
    try{
      const res = await fetch(`${API_BASE}/check-login`,
        {method: 'GET',
        credentials: 'include'}
      );
      const data = await res.json();
      setIsLoggedIn(data.status === 'success');
    } catch (error) {
      console.error("請確認登入狀態", error);
    }
  }

    // 登入表單資料狀態改變
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    // 只變更該欄位資料, 其他欄位仍保持原資料狀態
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };
  
  // 登入表單送出
  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止原生送出
    try{
      const res = await fetch(`${API_BASE}/login`,{
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(loginForm) // 轉換為 username=xxx&password=xxx
      });
    
      const resData = await res.json();
      console.log("伺服器回傳", resData);

      if(res.ok && resData.status === 200){
        alert("登入成功");
        // 將登入狀態設為 true
        setIsLoggedIn(true);
        // 導到首頁
        window.location.href = '/';
      } else {
        alert("登入失敗，請檢查帳號密碼" + resData.message);
      }
    } catch (err) {
      console.error("登入失敗", err.error);
    }
  };
  
  return (
    
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Input  
        type='text'
        name='username'
        value={loginForm.username}
        label='帳號' 
        onChange={handleLoginChange} 
        placeholder='請輸入帳號' />

        <Form.Input  
        type='password'
        name='password'
        value={loginForm.password}
        label='密碼' 
        onChange={handleLoginChange}         
        placeholder='請輸入密碼'/>
        <FormButton primary type='submit'>登入</FormButton>
      </Form>
    </Container>
  )
}

export default loginold;
// 請注意：這個檔案是舊版的登入頁面，可能不再使用