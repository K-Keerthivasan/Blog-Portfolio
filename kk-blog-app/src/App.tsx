import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {JSX, useState} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import './App.css'
import Navbar from "./frontend/Navbar.tsx";
import Home from "./frontend/Home.tsx";
import Footer from "./frontend/Footer.tsx";
import { darkTheme, lightTheme } from "./frontend/theme.tsx";
import ThemeTesterText from "./frontend/Testing/ThemeTesterText.tsx";
import ComponentsTester from "./frontend/Testing/ComponentsTester.tsx";
import Login from "./backend/Login.tsx";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import AdminPanel from "./backend/AdminPanel.tsx";
import { Navigate } from "react-router-dom";


// Add this once globally (e.g. in main.tsx or index.tsx)
document.addEventListener(
    "touchstart",
    () => {},
    { passive: false } // override default passive behavior
);


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>; // Optional: loading spinner
  if (!user || user.email !== "kkvasan99@gmail.com") return <Navigate to="/login" replace />;

  return children;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/text-tester" element={<ThemeTesterText />} />
            <Route path="/design-tester" element={<ComponentsTester />} />
            <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
            />
          </Routes>

          <Footer />
        </Router>
      </ThemeProvider>
  );
}

export default App
