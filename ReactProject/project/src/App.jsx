import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./login";
import ProtectedRoute from "./ProtectedRoute";

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
          navigate("/home"); // 如果已登入，重導向到首頁
        } else {
          setIsLoggedIn(false);
        }
      });
  }, []);

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/menu" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <h1>菜單</h1>
          </ProtectedRoute>
        } />
        <Route path="/menuHistory" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <h1>訂單紀錄</h1>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
