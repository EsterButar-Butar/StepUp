// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Assessment from "./pages/Assessment";
import Assessment2 from "./pages/Assessment2";
import Assessment3 from "./pages/Assessment3";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Analyzing from "./pages/Analyzing";
import Result from "./pages/Result";
import Result2 from "./pages/Result2";

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/assessment2" element={<Assessment2 />} />
        <Route path="/assessment3" element={<Assessment3 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result2" element={<Result2 />} />
      </Routes>
    </Router>
  );
}

export default App;
