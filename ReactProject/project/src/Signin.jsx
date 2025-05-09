import React from 'react'
import { FormField, Button, Form, Container, Menu, FormButton } from 'semantic-ui-react'

function Signin() {
  const [activeItem, setActiveItem] = React.useState('register')
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Container>
      <Menu widths={2}> 
        <Menu.Item 
          name='註冊' 
          active={activeItem === 'register'} 
          onClick={() => setActiveItem("register")}
          />

        <Menu.Item 
        name='登入' 
        active={activeItem === 'signin'} 
        onClick={() => setActiveItem("signin")}
        />
      </Menu>

      <Form>
        <Form.Input  
        value={account}
        label='帳號' 
        onChange={(e) => setAccount(e.target.value)} 
        placeholder='請輸入帳號' />

        <Form.Input  
        value={password}
        label='密碼' 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='請輸入密碼' 
        type='password'/>
        
        <FormButton primary type='submit'>
          {activeItem === 'register' ? '註冊' : '登入'}  
        </FormButton>
      </Form>

    </Container>
  )
}

export default Signin