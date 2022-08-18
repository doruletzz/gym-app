import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Plan from "./pages/Plan";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_PLAN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
} from "./utils/constants";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTE_PROFILE} element={<Profile />} />
        <Route path={ROUTE_PLAN} element={<Plan />} />
        <Route path={ROUTE_REGISTER} element={<Register />} />
        <Route path={ROUTE_LOGIN} element={<Login />} />
        <Route path={ROUTE_LOGOUT} element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
