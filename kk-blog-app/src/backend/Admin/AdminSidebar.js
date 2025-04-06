import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/AdminSidebar.tsx
import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography, Divider, } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WebIcon from "@mui/icons-material/Language";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import BrushIcon from "@mui/icons-material/Brush";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FolderIcon from "@mui/icons-material/Folder";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
const AdminSidebar = ({}) => {
    const [openPostManager, setOpenPostManager] = useState(false);
    const location = useLocation();
    return (_jsx(Drawer, { variant: "permanent", anchor: "left", children: _jsxs(Box, { sx: { width: 240, pt: 2 }, children: [_jsx(Typography, { variant: "h6", sx: { px: 2, fontWeight: "bold", mb: 2 }, children: "Admin Panel" }), _jsxs(List, { children: [_jsxs(ListItemButton, { component: Link, to: "/admin", selected: location.pathname === "/admin", children: [_jsx(ListItemIcon, { children: _jsx(DashboardIcon, {}) }), _jsx(ListItemText, { primary: "Dashboard" })] }), _jsxs(ListItemButton, { onClick: (e) => {
                                e.stopPropagation();
                                setOpenPostManager(!openPostManager);
                            }, children: [" ", _jsx(ListItemIcon, { children: _jsx(FolderIcon, {}) }), _jsx(ListItemText, { primary: "Post Manager" }), openPostManager ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {})] }), _jsx(Collapse, { in: openPostManager, timeout: "auto", unmountOnExit: true, children: _jsxs(List, { component: "div", disablePadding: true, children: [_jsxs(ListItemButton, { sx: { pl: 4 }, component: Link, to: "/admin/web-dev-post", children: [_jsx(ListItemIcon, { children: _jsx(WebIcon, {}) }), _jsx(ListItemText, { primary: "Web Dev Posts" })] }), _jsxs(ListItemButton, { sx: { pl: 4 }, component: Link, to: "/admin/game-dev-post", children: [_jsx(ListItemIcon, { children: _jsx(SportsEsportsIcon, {}) }), _jsx(ListItemText, { primary: "Game Dev Posts" })] }), _jsxs(ListItemButton, { sx: { pl: 4 }, component: Link, to: "/admin/editing-post", children: [_jsx(ListItemIcon, { children: _jsx(MovieFilterIcon, {}) }), _jsx(ListItemText, { primary: "Editing" })] }), _jsxs(ListItemButton, { sx: { pl: 4 }, component: Link, to: "/admin/vfx-post", children: [_jsx(ListItemIcon, { children: _jsx(BrushIcon, {}) }), _jsx(ListItemText, { primary: "VFX" })] })] }) }), _jsx(Divider, { sx: { my: 2 } }), _jsxs(ListItemButton, { component: Link, to: "/admin/create-post", selected: location.pathname === "/admin/create-post", children: [_jsx(ListItemIcon, { children: _jsx(AddBoxIcon, {}) }), _jsx(ListItemText, { primary: "Create a Post" })] })] })] }) }));
};
export default AdminSidebar;
