import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./login";
import OrderList from "./OrderList";
import ProtectedRoute from "./ProtectedRoute";
import UserCreate from "./UserCreate";
import MenuHistory from "./MenuHistory";
import MenuManagement from "./MenuManagement"; 
function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 檢查登入狀態，每次路由變化時都檢查
  useEffect(() => {
    setIsAuthLoading(true);
    fetch("http://localhost:8081/check-login", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.status === true);
        setIsAuthLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAuthLoading(false);
      });
  }, [location.pathname]);

  const isLoginPage = location.pathname === "/login" || location.pathname === "/";

  // 包裝過的 ProtectedRoute，處理 loading 狀態
  const Guard = ({ children }) => {
    if (isAuthLoading) return <div>載入中...</div>;
    return (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        {children}
      </ProtectedRoute>
    );
  };

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        {/* 根路徑自動導向 /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 未登入才可進入登入頁，否則導向 /home */}
        <Route
          path="/login"
          element={
            isAuthLoading
              ? <div>載入中...</div>
              : isLoggedIn
                ? <Navigate to="/home" replace />
                : <Login />
          }
        />

        {/* 受保護頁面 */}
        <Route
          path="/home"
          element={
            <Guard>
              <Home />
            </Guard>
          }
        />
        <Route
          path="/menu"
          element={
            <Guard>
              <OrderList />
            </Guard>
          }
        />
        <Route
          path="/menuHistory"
          element={
            <Guard>
              <MenuHistory />
            </Guard>
          }
        />
        <Route
          path="/menuManagement"
          element={
            <Guard>
              <MenuManagement />
            </Guard>
          }
        />
        <Route
          path="/addUser"
          element={
            <Guard>
              <UserCreate />
            </Guard>
          }
        />
        <Route
          path="/menuPost"
          element={
            <Guard>
              <h1>留言板</h1>
            </Guard>
          }
        />
        

        {/* 其他未定義路徑自動導向登入或首頁 */}
        <Route
          path="*"
          element={
            isAuthLoading
              ? <div>載入中...</div>
              : isLoggedIn
                ? <Navigate to="/home" replace />
                : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
