import { use, useEffect, useState } from 'react';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8081';

function HeaderBar() {
  const [activeItem, setActiveItem] = useState('首頁');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setAdmin] = useState('');
  const navigate = useNavigate();

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
        setUsername(data.username);
        setAdmin(data.role)
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    } catch (error) {
      console.error("無法確認登入狀態", error);
    }
  };

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogoutSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE}/logout`, {
        method: 'GET',
        credentials: 'include'
      });

      const resData = await res.json();
      if (res.ok && resData.status === 200) {
        alert(resData.message);
        setIsLoggedIn(false);
        navigate('/login'); // 使用 navigate 取代 window.location.href
      } else {
        alert('登出失敗：' + resData.message);
      }
    } catch (err) {
      alert('登出錯誤: ' + err.message);
    }
  };

  return ( 
    isAdmin === 1 ?
    <Menu size='huge'>
      <Menu.Item
        name='首頁'
        active={activeItem === '首頁'}
        onClick={handleItemClick}
        as={Link}
        to='/home'
      />
      <Menu.Item
        name='菜單'
        active={activeItem === '菜單'}
        onClick={handleItemClick}
        as={Link}
        to='/menu'
      />
      <Menu.Item
        name='訂單紀錄'
        active={activeItem === '訂單紀錄'}
        onClick={handleItemClick}
        as={Link}
        to='/menuHistory'
      />
      <Menu.Item
        name='菜單管理'
        active={activeItem === '菜單管理'}
        onClick={handleItemClick} 
        as={Link}
        to='/menuManagement'      
      />
      <Menu.Item
        name='新增使用者'
        active={activeItem === '新增使用者'}
        onClick={handleItemClick}
        as={Link}
        to='/addUser'
      />
      <Menu.Menu position='right'>
          <>
            <Menu.Item>
              <span style={{ marginRight: '1em' }}>{ isAdmin === 1 ? '管理員:' : '使用者:' }{username}</span>
              <Button onClick={handleLogoutSubmit} color='red'>登出</Button>
            </Menu.Item>
          </>
      </Menu.Menu>
    </Menu> 
    : 
    <> 
    <Menu size='huge'>
      <Menu.Item
        name='首頁'
        active={activeItem === '首頁'}
        onClick={handleItemClick}
        as={Link}
        to='/home'
      />
      <Menu.Item
        name='菜單'
        active={activeItem === '菜單'}
        onClick={handleItemClick}
        as={Link}
        to='/menu'
      />
      <Menu.Item
        name='訂單紀錄'
        active={activeItem === '訂單紀錄'}
        onClick={handleItemClick}
        as={Link}
        to='/menuHistory'
      />
      <Menu.Item
        name='留言板'
        active={activeItem === '留言板'}
        onClick={handleItemClick}
        as={Link}
        to='/menuPost'
      />
        <Menu.Menu position='right'>
          <>
            <Menu.Item>
              <span style={{ marginRight: '1em' }}>{ isAdmin === 1 ? '管理員:' : '使用者:' }{username}</span>
              <Button onClick={handleLogoutSubmit} color='red'>登出</Button>
            </Menu.Item>
          </>
        </Menu.Menu>
      </Menu>
    </>
  );
}

export default HeaderBar;
