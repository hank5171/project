import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/NewHome";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserCreate from "./pages/UserCreate";
import MenuHistory from "./pages/MenuHistory";
import MenuManagement from "./pages/MenuManagement";
import ShopManagement from "./pages/ShopManagement";
import { useAuth } from "./context/AuthContext";
import Menu from "./pages/Menu";
import MenuPost from "./pages/MenuPost";
import MenuOrderLoan from "./pages/MenuOrderList";
import MenuOrderList from "./pages/MenuOrderList";

function Guard({ children }) {
  const { isLoggedIn, isAuthLoading } = useAuth();
  if (isAuthLoading) return <div>載入中...</div>;
  return <ProtectedRoute isLoggedIn={isLoggedIn}>{children}</ProtectedRoute>;
}

export default function RoutesConfig() {
  const location = useLocation();
  const { isLoggedIn, isAuthLoading } = useAuth();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            isAuthLoading ? (
              <div>載入中...</div>
            ) : isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login />
            )
          }
        />
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
              <Menu />
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
          path="/menuOrderList"
          element={
            <Guard>
              <MenuOrderList />
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
          path="/shop"
          element={
            <Guard>
              <ShopManagement />
            </Guard>
          }
        />
        <Route
          path="/menuPost"
          element={
            <Guard>
              <MenuPost />
            </Guard>
          }
        />
        <Route
          path="*"
          element={
            isAuthLoading ? (
              <div>載入中...</div>
            ) : isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}
