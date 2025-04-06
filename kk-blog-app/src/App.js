import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import './App.css';
import Navbar from "./frontend/Navbar.tsx";
import Home from "./frontend/home/Home.tsx";
import Footer from "./frontend/Footer.tsx";
import { darkTheme, lightTheme } from "./frontend/theme.tsx";
import ThemeTesterText from "./frontend/Testing/ThemeTesterText.tsx";
import ComponentsTester from "./frontend/Testing/ComponentsTester.tsx";
import Login from "./backend/Login.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import AdminPanel from "./backend/Admin/AdminPanel.tsx";
import { Navigate } from "react-router-dom";
import CreatePost from "./backend/post/CreatePost.tsx";
import WebDevPostAdmin from "./backend/post/tech/WebDevPostAdmin.tsx";
import EditPostCollection from "./backend/post/EditPostCollection.tsx";
import GameDevPostAdmin from "./backend/post/tech/GameDevPostAdmin.tsx";
import VFXPostAdmin from "./backend/post/film/VFXPostAdmin.tsx";
import EditingPostAdmin from "./backend/post/film/EditingPostAdmin.tsx";
import PostListPublic from "./frontend/pages/PostListPublic.tsx";
import PostDetailsPublic from "./frontend/pages/PostDetailsPublic.tsx"; // adjust path
//#TODO Code bar option in the post
//#TODO Figure out a way to upload diagram in the post as well
//#TODO Users Option
// Add this once globally (e.g. in main.tsx or index.tsx)
document.addEventListener("touchstart", () => {
}, { passive: false } // override default passive behavior
);
const ProtectedRoute = ({ children }) => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    if (loading)
        return _jsx("p", { children: "Loading..." }); // Optional: loading spinner
    if (!user || user.email !== "kkvasan99@gmail.com")
        return _jsx(Navigate, { to: "/login", replace: true });
    return children;
};
function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    return (_jsxs(ThemeProvider, { theme: isDarkMode ? darkTheme : lightTheme, children: [_jsx(CssBaseline, {}), _jsx(Box, { sx: {
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }, children: _jsxs(Router, { children: [_jsx(Navbar, { toggleTheme: toggleTheme, isDarkMode: isDarkMode }), _jsx(Box, { sx: { flex: 1 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/text-tester", element: _jsx(ThemeTesterText, {}) }), _jsx(Route, { path: "/design-tester", element: _jsx(ComponentsTester, {}) }), _jsx(Route, { path: "/blog/:id", element: _jsx(PostDetailsPublic, {}) }), _jsx(Route, { path: "/web-dev", element: _jsx(PostListPublic, { collectionName: "web_dev_collection" }) }), _jsx(Route, { path: "/game-dev", element: _jsx(PostListPublic, { collectionName: "game_dev_collection" }) }), _jsx(Route, { path: "/editing", element: _jsx(PostListPublic, { collectionName: "editing_collection" }) }), _jsx(Route, { path: "/vfx", element: _jsx(PostListPublic, { collectionName: "visual_effects_collection" }) }), _jsx(Route, { path: "/:collection/:id", element: _jsx(PostDetailsPublic, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(AdminPanel, {}) }) }), _jsx(Route, { path: "/admin/create-post", element: _jsx(ProtectedRoute, { children: _jsx(CreatePost, {}) }) }), _jsx(Route, { path: "/admin/edit/:collectionName/:postId", element: _jsx(ProtectedRoute, { children: _jsx(EditPostCollection, {}) }) }), _jsx(Route, { path: "/admin/web-dev-post", element: _jsx(ProtectedRoute, { children: _jsx(WebDevPostAdmin, {}) }) }), _jsx(Route, { path: "/admin/game-dev-post", element: _jsx(ProtectedRoute, { children: _jsx(GameDevPostAdmin, {}) }) }), _jsx(Route, { path: "/admin/vfx-post", element: _jsx(ProtectedRoute, { children: _jsx(VFXPostAdmin, {}) }) }), _jsx(Route, { path: "/admin/editing-post", element: _jsx(ProtectedRoute, { children: _jsx(EditingPostAdmin, {}) }) })] }) }), _jsx(Footer, {})] }) })] }));
}
export default App;
