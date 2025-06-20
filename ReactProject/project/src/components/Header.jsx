import { useEffect, useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { checkLoginStatus, logout } from "../services/authService";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(null); // 建議用數字
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 根據路由自動設定 activeItem
  const getActiveItem = (pathname) => {
    if (pathname.startsWith("/home")) return "首頁";
    if (pathname.startsWith("/menuHistory")) return "訂單紀錄";
    if (pathname.startsWith("/menuOrderList")) return "訂單總覽";
    if (pathname.startsWith("/menuManagement")) return "菜單管理";
    if (pathname.startsWith("/addUser")) return "新增使用者";
    if (pathname.startsWith("/shop")) return "餐廳管理";
    if (pathname.startsWith("/menuPost")) return "留言板";
    if (pathname.startsWith("/menu")) return "菜單";
    return "首頁";
  };

  // 定義所有選單與權限
  const menuItems = [
    { label: "首頁", key: "/home", permissions: [1, 2] },
    { label: "菜單", key: "/menu", permissions: [1, 2] },
    { label: "訂單紀錄", key: "/menuHistory", permissions: [1, 2] },
    { label: "訂單總覽", key: "/menuOrderList", permissions: [1] },
    { label: "菜單管理", key: "/menuManagement", permissions: [1] },
    { label: "餐廳管理", key: "/shop", permissions: [1] },
    { label: "新增使用者", key: "/addUser", permissions: [1] },
    { label: "留言板", key: "/menuPost", permissions: [2] },
  ];

  const activeItem = getActiveItem(location.pathname);

  // 取得登入狀態
  useEffect(() => {
    checkLoginStatus()
      .then((data) => {
        if (data.status) {
          setIsLoggedIn(true);
          setUsername(data.username);
          setRole(Number(data.role)); // 確保是數字
        } else {
          setIsLoggedIn(false);
          setUsername("");
          setRole(null);
        }
      })
      .catch((err) => setErrorMsg("取得登入狀態失敗：" + err.message));
  }, []);

  // 登出
  const handleLogoutSubmit = async () => {
    try {
      const resData = await logout();
      if (resData.status === 200) {
        alert(resData.message);
        setIsLoggedIn(false);
        setUsername("");
        setRole(null);
        navigate("/login");
      } else {
        alert("登出失敗：" + resData.message);
      }
    } catch (err) {
      alert("登出錯誤: " + err.message);
    }
  };

  // 根據權限過濾選單
  const filteredMenuItems = menuItems.filter((item) =>
    item.permissions.includes(role)
  );

  return (
    <Menu size="huge">
      {filteredMenuItems.map((item) => (
        <Menu.Item
          key={item.key}
          name={item.label}
          active={activeItem === item.label}
          as={Link}
          to={item.key}
        />
      ))}
      <Menu.Menu position="right">
        <Menu.Item>
          <span style={{ marginRight: "1em" }}>
            {role === 1 ? "管理員:" : "使用者:"}
            {username}
          </span>
          <Button onClick={handleLogoutSubmit} color="red">
            登出
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
