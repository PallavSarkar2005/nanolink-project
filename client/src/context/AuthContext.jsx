import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Configure Axios defaults
  axios.defaults.baseURL = "http://localhost:5000/api";

  // Check login status on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  // REGISTER
  const register = async (username, email, password) => {
    try {
      const res = await axios.post("/auth/register", { username, email, password });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success("Account created successfully! 🚀");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success("Welcome back! 👋");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};