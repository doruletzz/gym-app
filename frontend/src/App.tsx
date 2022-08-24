import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Plan from "./pages/Plan";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_NUTRITION,
  ROUTE_PLAN,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
  ROUTE_WORKOUT,
} from "./utils/constants";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import NutritionPlan from "./pages/NutritionPlan";
import WorkoutPlan from "./pages/WorkoutPlan";
import { useAppSelector } from "./features/app/hooks";

function App() {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        {token ? (
          <>
            <Route path={ROUTE_PROFILE} element={<Profile />} />
            <Route path={ROUTE_PLAN} element={<Plan />} />
            <Route
              path={ROUTE_PLAN + "/" + ROUTE_NUTRITION + "/:slug"}
              element={<NutritionPlan />}
            />

            <Route
              path={ROUTE_PLAN + "/" + ROUTE_WORKOUT + "/:slug"}
              element={<WorkoutPlan />}
            />
            <Route path={ROUTE_LOGOUT} element={<Logout />} />
          </>
        ) : (
          <>
            <Route path={ROUTE_LOGIN} element={<Login />} />
            <Route path={ROUTE_REGISTER} element={<Register />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
