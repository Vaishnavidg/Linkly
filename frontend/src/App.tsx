import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      ;
    </>
  );
}

export default App;
