import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import TasksDashboard from "./components/TasksDashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleAuthSuccess = (loggedInUser, token) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="card">
          <h1 style={{ marginTop: 0, marginBottom: 12 }}>
            AnyThingAI
          </h1>

          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onAuthSuccess={handleAuthSuccess} />
                )
              }
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/dashboard" replace /> : <Register />}
            />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <TasksDashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            {/* default route */}
            <Route
              path="*"
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
