import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/NewHome";
import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
import UserCreate from "./pages/UserCreate";
import MenuHistory from "./pages/MenuHistory";
import MenuManagement from "./pages/MenuManagement";
import ShopManagement from "./pages/ShopManagement";
import { useAuth } from "./context/AuthContext";
import Menu from "./pages/Menu";
import MenuPost from "./pages/MenuPost";
import MenuOrderList from "./pages/MenuOrderList";

function PermissionGuard({ children, allowedPermissions }) {
  const { isLoggedIn, isAuthLoading, userPermission } = useAuth();
  if (isAuthLoading) return <div>載入中...</div>;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedPermissions.includes(userPermission)) {
    return <Navigate to="/403" replace />; // 無權限頁面
  }

  return children;
}
// return <ProtectedRoute isLoggedIn={isLoggedIn}>{children}</ProtectedRoute>;

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
            <PermissionGuard allowedPermissions={[1, 2]}>
              <Home />
            </PermissionGuard>
          }
        />
        <Route
          path="/menu"
          element={
            <PermissionGuard allowedPermissions={[1, 2]}>
              <Menu />
            </PermissionGuard>
          }
        />
        <Route
          path="/menuHistory"
          element={
            <PermissionGuard allowedPermissions={[1, 2]}>
              <MenuHistory />
            </PermissionGuard>
          }
        />
        <Route
          path="/menuManagement"
          element={
            <PermissionGuard allowedPermissions={[1]}>
              <MenuManagement />
            </PermissionGuard>
          }
        />
        <Route
          path="/menuOrderList"
          element={
            <PermissionGuard allowedPermissions={[1]}>
              <MenuOrderList />
            </PermissionGuard>
          }
        />
        <Route
          path="/addUser"
          element={
            <PermissionGuard allowedPermissions={[1]}>
              <UserCreate />
            </PermissionGuard>
          }
        />
        <Route
          path="/shop"
          element={
            <PermissionGuard allowedPermissions={[1]}>
              <ShopManagement />
            </PermissionGuard>
          }
        />
        <Route
          path="/menuPost"
          element={
            <PermissionGuard allowedPermissions={[2]}>
              <MenuPost />
            </PermissionGuard>
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
