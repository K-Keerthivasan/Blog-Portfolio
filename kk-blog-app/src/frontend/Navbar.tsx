import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Typography,
    Divider,
}from "@mui/material";

import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

type NavbarProps = {
    toggleTheme: () => void;
    isDarkMode: boolean;
};

// ✅ Nav Items defined outside component
const navItems = [
    { name: "Home", icon: <HomeIcon />, link: "/" },
];

const Navbar = ({ toggleTheme, isDarkMode }: NavbarProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
        <AppBar
            position="relative"
            color="primary"
            sx={{

                padding: 0,
            }}
        >
            <Toolbar sx={{ width: "100%", padding: "0 20px", display: "flex", justifyContent: "space-between" }}>

                {/* 📂 Left side: Menu button */}
                <Box>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleMenuOpen}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        {/* Tech Section */}
                        <Typography
                            variant="subtitle2"
                            sx={(theme) => ({
                                px: 2,
                                pt: 1,
                                fontWeight: 600,
                                color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2", // dark → light blue, light → deep blue
                            })}
                        >
                            Tech
                        </Typography>
                        <MenuItem onClick={handleMenuClose}>Web Dev</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Game Dev</MenuItem>

                        <Divider sx={{ my: 1 }} />

                        {/* Film Section */}
                        <Typography
                            variant="subtitle2"
                            sx={(theme) => ({
                                px: 2,
                                pt: 1,
                                fontWeight: 600,
                                color: theme.palette.mode === "dark" ? "#f99090" : "#d21919", // dark → light blue, light → deep blue
                            })}
                        >
                            Film
                        </Typography>
                        <MenuItem onClick={handleMenuClose}>Editing</MenuItem>
                        <MenuItem onClick={handleMenuClose}>VFX</MenuItem>
                    </Menu>
                </Box>


                {/* This Box pushes all content to the right */}
                <Box sx={{ display: "flex", gap: 2, marginLeft: "auto", alignItems: "center" }}>
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

                    {/* Theme Toggle Icon */}
                    <Tooltip title="Toggle light/dark mode">
                        <IconButton onClick={toggleTheme} sx={{   }}>
                            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
