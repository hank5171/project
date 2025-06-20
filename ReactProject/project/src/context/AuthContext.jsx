import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userPermission, setUserPermission] = useState();

  useEffect(() => {
    setIsAuthLoading(true);
    fetch("http://localhost:8081/check-login", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.status === true);
        setIsAuthLoading(false);
        setUserPermission(data.role);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAuthLoading(false);
      });
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthLoading, userPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
