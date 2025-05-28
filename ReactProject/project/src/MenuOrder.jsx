import { useEffect, useState } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

const API_BASE = 'http://localhost:8081';

function MenuOrder() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/user-list`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // 假設回傳資料格式是：[{ username: 'Hank' }, { username: 'Alice' }]
          const options = data.data.map(user => ({
            key: user.username,
            text: user.username,
            value: user.username,
          }));
          setUsers(options);
        } else {
          console.error('載入使用者清單失敗', data.message);
        }
      })
      .catch((err) => console.error('錯誤', err));
  }, []);

    return (
    <Menu>
      <Menu.Item name="首頁" />
      <Menu.Item name="訂單" />

      <Menu.Menu position="right">
        <Dropdown item text="使用者">
          <Dropdown.Menu>
            {users.length > 0 ? (
              users.map((user) => (
                <Dropdown.Item key={user.key} text={user.text} />
              ))
            ) : (
              <Dropdown.Item disabled text="載入中..." />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}

export default MenuOrder;
