import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCartCount(
        parsedUser.cart?.reduce((total, item) => total + item.quantity, 0) || 0
      );
    }
  }, []);

  // Sync user and update cart count
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setCartCount(
        user.cart?.reduce((total, item) => total + item.quantity, 0) || 0
      );
    } else {
      localStorage.removeItem("user");
      setCartCount(0);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, cartCount,setCartCount,totalAmount, setTotalAmount }}>
      {children}
    </AuthContext.Provider>
  );
}
