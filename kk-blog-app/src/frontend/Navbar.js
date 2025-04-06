import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AppBar, Toolbar, Box, Button, IconButton, Tooltip, Typography, Divider, Drawer, List, ListItemText, ListItemIcon, ListItemButton, } from "@mui/material";
import AdminSidebar from "../backend/Admin/AdminSidebar.tsx"; // update path if needed
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WebIcon from "@mui/icons-material/Language";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import BrushIcon from "@mui/icons-material/Brush";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Navigation links for the top-right buttons
const navItems = [
    { name: "Home", icon: _jsx(HomeIcon, {}), link: "/" },
];
// Sidebar drawer sections
const techItems = [
    { name: "Web Dev", icon: _jsx(WebIcon, {}), link: "/web-dev" },
    { name: "Game Dev", icon: _jsx(SportsEsportsIcon, {}), link: "/game-dev" },
];
const filmItems = [
    { name: "Editing", icon: _jsx(MovieFilterIcon, {}), link: "/editing" },
    { name: "VFX", icon: _jsx(BrushIcon, {}), link: "/vfx" },
];
const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    return (_jsxs(Box, { children: [_jsx(AppBar, { position: "relative", color: "primary", children: _jsxs(Toolbar, { sx: { padding: "0 20px", display: "flex", justifyContent: "space-between" }, children: [_jsx(IconButton, { edge: "start", color: "inherit", onClick: toggleDrawer(true), sx: { mr: 2 }, children: _jsx(MenuIcon, {}) }), _jsxs(Box, { sx: { display: "flex", gap: 2, marginLeft: "auto", alignItems: "center" }, children: [navItems.map((item) => (_jsx(Button, { component: Link, to: item.link, startIcon: item.icon, sx: {
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                    }, children: item.name }, item.name))), _jsx(Tooltip, { title: "Toggle light/dark mode", children: _jsx(IconButton, { onClick: toggleTheme, children: isDarkMode ? _jsx(LightModeIcon, {}) : _jsx(DarkModeIcon, {}) }) })] })] }) }), _jsx(Drawer, { anchor: "left", open: drawerOpen, onClose: toggleDrawer(false), children: _jsx(Box, { sx: { width: 250 }, role: "presentation", onClick: toggleDrawer(false), children: isAdminRoute ? (_jsx(AdminSidebar, { currentPage: "dashboard", setPage: () => { } })) : (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "subtitle2", sx: (theme) => ({
                                    px: 2,
                                    pt: 1,
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                                }), children: "Tech" }), _jsx(List, { children: techItems.map((item) => (_jsxs(ListItemButton, { component: Link, to: item.link, children: [_jsx(ListItemIcon, { children: item.icon }), _jsx(ListItemText, { primary: item.name })] }, item.name))) }), _jsx(Divider, {}), _jsx(Typography, { variant: "subtitle2", sx: (theme) => ({
                                    px: 2,
                                    pt: 1,
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    color: theme.palette.mode === "dark" ? "#f99090" : "#d21919",
                                }), children: "Film" }), _jsx(List, { children: filmItems.map((item) => (_jsxs(ListItemButton, { component: Link, to: item.link, children: [_jsx(ListItemIcon, { children: item.icon }), _jsx(ListItemText, { primary: item.name })] }, item.name))) })] })) }) })] }));
};
export default Navbar;
