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
  ROUTE_NUTRITION_ADD,
  ROUTE_PLAN,
  ROUTE_PLANS,
  ROUTE_PLANS_ADD,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
  ROUTE_WORKOUT,
  ROUTE_WORKOUT_ADD,
} from "./utils/constants";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import NutritionPlan from "./pages/NutritionPlan";
import WorkoutPlan from "./pages/WorkoutPlan";
import { useAppSelector } from "./features/app/hooks";
import Plans from "./pages/Plans";
import PlanAdd from "./pages/PlanAdd";
import WorkoutAdd from "./pages/WorkoutAdd";

function App() {
  const { token, role } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
            {role === "admin" && (
              <>
                <Route path={ROUTE_PLANS} element={<Plans />} />
                <Route path={ROUTE_PLANS_ADD} element={<PlanAdd />} />
                {/* <Route path={ROUTE_NUTRITION_ADD} element={<NutritionAdd />} /> */}
                <Route path={ROUTE_WORKOUT_ADD} element={<WorkoutAdd />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path={ROUTE_LOGIN} element={<Login />} />
            <Route path={ROUTE_REGISTER} element={<Register />} />
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
