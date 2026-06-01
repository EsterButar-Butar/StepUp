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
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />

        {/* PROTECTED */}
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment2"
          element={
            <ProtectedRoute>
              <Assessment2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment3"
          element={
            <ProtectedRoute>
              <Assessment3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analyzing"
          element={
            <ProtectedRoute>
              <Analyzing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail-result/:id"
          element={
            <ProtectedRoute>
              <DetailResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cvresult"
          element={
            <ProtectedRoute>
              <CVResult />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
