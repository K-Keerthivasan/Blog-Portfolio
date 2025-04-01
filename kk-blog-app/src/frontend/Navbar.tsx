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

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WebIcon from "@mui/icons-material/Language";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import BrushIcon from "@mui/icons-material/Brush";
import {useState} from "react";

import {Link} from "react-router-dom";

type NavbarProps = {
    toggleTheme: () => void;
    isDarkMode: boolean;
};

// Navigation links for the top-right buttons
const navItems = [
    {name: "Home", icon: <HomeIcon/>, link: "/"},
];

// Sidebar drawer sections
const techItems = [
    {name: "Web Dev", icon: <WebIcon/>},
    {name: "Game Dev", icon: <SportsEsportsIcon/>},
];

const filmItems = [
    {name: "Editing", icon: <MovieFilterIcon/>},
    {name: "VFX", icon: <BrushIcon/>},
];

const Navbar = ({toggleTheme, isDarkMode}: NavbarProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

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
                                startIcon={item.icon}
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    },
                                }}
                            >
                                {item.name}
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
                    {/* Tech Section */}
                    <Typography
                        variant="subtitle2"
                        sx={(theme) => ({
                            px: 2,
                            pt: 1,
                            fontWeight: 600,
                            fontSize: "18px",
                            color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2", // dark → light blue, light → deep blue
                        })}
                    >
                        Tech
                    </Typography>

                    <List>
                        {techItems.map((item) => (
                            <ListItemButton
                                key={item.name}
                                component={Link}
                                to={`/${item.name.toLowerCase().replace(" ", "-")}`}
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
                            color: theme.palette.mode === "dark" ? "#f99090" : "#d21919", // dark → light blue, light → deep blue
                        })}
                    >
                        Film
                    </Typography>
                    <List>
                        {filmItems.map((item) => (
                            <ListItemButton key={item.name}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Navbar;
