import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
    Divider,
    Drawer,
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,

} from "@mui/material";
import FastForwardIcon from '@mui/icons-material/FastForward';
import AdminSidebar from "../backend/Admin/AdminSidebar.tsx"; // update path if needed
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CodeOffIcon from '@mui/icons-material/CodeOff';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WebIcon from "@mui/icons-material/Language";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import BrushIcon from "@mui/icons-material/Brush";
import {useState} from "react";

import {Link, useLocation} from "react-router-dom";

type NavbarProps = {
    toggleTheme: () => void;
    isDarkMode: boolean;
};

// Navigation links for the top-right buttons
const navItems = [
    {name: "Home", icon: <HomeIcon/>, link: "/", color: "#ffffff", hoverColor: "#b3b3b3"},
    {icon: <CodeOffIcon/>, link: "https://dev.kkvasan.ca/", color: "#0077ff", hoverColor: "#74b4ff"},
    {icon: <FastForwardIcon/>, link: "https://film.kkvasan.ca/", color: "#ff0000", hoverColor: "#ff9292"},
];

// Sidebar drawer sections
const techItems = [
    {name: "Web Dev", icon: <WebIcon/>, link: "/web-dev"},
    {name: "Game Dev", icon: <SportsEsportsIcon/>, link: "/game-dev"},
];

const filmItems = [
    {name: "Editing", icon: <MovieFilterIcon/>, link: "/editing"},
    {name: "VFX", icon: <BrushIcon/>, link: "/vfx"},
];


const Navbar = ({toggleTheme, isDarkMode}: NavbarProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const location = useLocation();


    const isAdminRoute = location.pathname.startsWith("/admin");


    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <Box>
            <AppBar position="relative" color="primary">
                <Toolbar sx={{padding: "0 20px", display: "flex", justifyContent: "space-between"}}>
                    {/* Menu Icon to toggle Sidebar */}
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>

                    {/* Right-side navigation and theme toggle */}
                    <Box sx={{display: "flex", gap: 2, marginLeft: "auto", alignItems: "center"}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                to={item.link}
                                disableRipple
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    textTransform: "none",
                                    minWidth: "unset",
                                    px: 1.5,
                                    py: 1,
                                    gap: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                    outline: "none",
                                    transition: "all 0.3s ease",

                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                    "&:focus, &:focusVisible": {
                                        outline: "none",
                                        boxShadow: "none",
                                        backgroundColor: "transparent",
                                    },

                                    // ✨ Add hover behavior manually for icon and text
                                    "&:hover .icon-color, &:hover .text-color": {
                                        color: item.hoverColor,
                                    },
                                }}
                            >
                                {/* Icon */}
                                <Box
                                    className="icon-color"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: item.color,
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                {/* Text */}
                                <Typography
                                    className="text-color"
                                    sx={{
                                        color: item.color,
                                        fontWeight: "bold",
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </Button>


                        ))}

                        <Tooltip title="Toggle light/dark mode">
                            <IconButton onClick={toggleTheme}>
                                {isDarkMode ? <LightModeIcon/> : <DarkModeIcon/>}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
                    {isAdminRoute ? (
                        <AdminSidebar />
                    ) : (
                        <>
                            {/* Tech Section */}
                            <Typography
                                variant="subtitle2"
                                sx={(theme) => ({
                                    px: 2,
                                    pt: 1,
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                                })}
                            >
                                Tech
                            </Typography>

                            <List>
                                {techItems.map((item) => (
                                    <ListItemButton
                                        key={item.name}
                                        component={Link}
                                        to={item.link}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name}/>
                                    </ListItemButton>
                                ))}
                            </List>

                            <Divider/>

                            {/* Film Section */}
                            <Typography
                                variant="subtitle2"
                                sx={(theme) => ({
                                    px: 2,
                                    pt: 1,
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    color: theme.palette.mode === "dark" ? "#f99090" : "#d21919",
                                })}
                            >
                                Film
                            </Typography>

                            <List>
                                {filmItems.map((item) => (
                                    <ListItemButton
                                        key={item.name}
                                        component={Link}
                                        to={item.link}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name}/>
                                    </ListItemButton>
                                ))}
                            </List>
                        </>
                    )}
                </Box>
            </Drawer>

        </Box>
    );
};

export default Navbar;

