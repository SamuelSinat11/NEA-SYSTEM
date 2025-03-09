import React from "react";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./page/home/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element ={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<h1>404-Route Not Found </h1>} />
        </Route>

        <Route element={<LoginPage />} path="/login" />
        
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
      
  )
};

export default App;