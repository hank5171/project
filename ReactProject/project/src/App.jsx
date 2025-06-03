import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./login";
import OrderList from "./OrderList";
import ProtectedRoute from "./ProtectedRoute";
import UserCreateForm from "./UserCreateForm";
import MenuHistory from "./MenuHistory";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 檢查登入狀態
  useEffect(() => {
    fetch("http://localhost:8081/check-login", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  }, []);

  const isLoginPage = location.pathname === "/login" || location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={ <Login /> } /> // 根路徑重定向到登入頁面       
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/menu" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <OrderList />
          </ProtectedRoute>
        } />
        <Route path="/menuHistory" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MenuHistory />
          </ProtectedRoute>
        } />
        <Route path="/menuManagement" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <h1>菜單管理</h1>
          </ProtectedRoute>
        } />
        <Route path="/addUser" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <UserCreateForm/>
          </ProtectedRoute>
        } />
        <Route path="/menuPost" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <h1>留言板</h1>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
