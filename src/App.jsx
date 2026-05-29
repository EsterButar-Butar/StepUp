// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Assessment from "./pages/Assessment";
import Assessment2 from "./pages/Assessment2";
import Assessment3 from "./pages/Assessment3";
import Register from "./pages/Register.jsx";
import Analyzing from "./pages/Analyzing";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import DetailResult from "./pages/DetailResult.jsx";
import CVResult from "./pages/CVResult.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/assessment2" element={<Assessment2 />} />
        <Route path="/assessment3" element={<Assessment3 />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/detail-result/:id" element={<DetailResult />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cvresult" element={<CVResult />} />
      </Routes>
    </Router>
  );
}

export default App;
