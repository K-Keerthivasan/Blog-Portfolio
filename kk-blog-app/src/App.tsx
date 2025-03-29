import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import './App.css'
import Navbar from "./frontend/Navbar.tsx";
import Home from "./frontend/Home.tsx";
import Footer from "./frontend/Footer.tsx";
import { darkTheme, lightTheme } from "./frontend/theme.tsx";
import ThemeTesterText from "./frontend/Testing/ThemeTesterText.tsx";
import ComponentsTester from "./frontend/Testing/ComponentsTester.tsx";

function App() {

  const [isDarkMode, setIsDarkMode] = useState(true); // ✅ Default to dark mode

  const toggleTheme = () => setIsDarkMode(!isDarkMode);


  return (
<div>
  <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <CssBaseline />
  <Router>

    <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
  <Routes >
    <Route path="/" element={<Home/>}/>
    <Route path="/text-tester" element={<ThemeTesterText/>}/>
    <Route path="/design-tester" element={<ComponentsTester/>}/>
  </Routes>
</Router>

<Footer />

  </ThemeProvider>
</div>
  )
}

export default App
