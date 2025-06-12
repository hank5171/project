import { useEffect, useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setAdmin] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE = "http://localhost:8081";

  // 根據路由自動設定 activeItem
  const getActiveItem = (pathname) => {
    if (pathname.startsWith('/home')) return '首頁';
    if (pathname.startsWith('/menuHistory')) return '訂單紀錄';
    if (pathname.startsWith('/menuManagement')) return '菜單管理';
    if (pathname.startsWith('/addUser')) return '新增使用者';
    if (pathname.startsWith('/menuPost')) return '留言板';
    if (pathname.startsWith('/menu')) return '菜單';
    return '首頁';
  };

  const activeItem = getActiveItem(location.pathname);

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
        navigate('/login');
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
          as={Link}
          to='/home'
        />
        <Menu.Item
          name='菜單'
          active={activeItem === '菜單'}
          as={Link}
          to='/menu'
        />
        <Menu.Item
          name='訂單紀錄'
          active={activeItem === '訂單紀錄'}
          as={Link}
          to='/menuHistory'
        />
        <Menu.Item
          name='菜單管理'
          active={activeItem === '菜單管理'}
          as={Link}
          to='/menuManagement'
        />
          <Menu.Item
          name='餐廳管理'
          active={activeItem === '餐廳管理'}
          as={Link}
          to='/shop'
          />
        <Menu.Item
          name='新增使用者'
          active={activeItem === '新增使用者'}
          as={Link}
          to='/addUser'
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <span style={{ marginRight: '1em' }}>{'管理員:'}{username}</span>
            <Button onClick={handleLogoutSubmit} color='red'>登出</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      :
      <Menu size='huge'>
        <Menu.Item
          name='首頁'
          active={activeItem === '首頁'}
          as={Link}
          to='/home'
        />
        <Menu.Item
          name='菜單'
          active={activeItem === '菜單'}
          as={Link}
          to='/menu'
        />
        <Menu.Item
          name='訂單紀錄'
          active={activeItem === '訂單紀錄'}
          as={Link}
          to='/menuHistory'
        />
        <Menu.Item
          name='留言板'
          active={activeItem === '留言板'}
          as={Link}
          to='/menuPost'
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <span style={{ marginRight: '1em' }}>{'使用者:'}{username}</span>
            <Button onClick={handleLogoutSubmit} color='red'>登出</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
  );
}

export default Header;
