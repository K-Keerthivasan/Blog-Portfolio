// components/AdminSidebar.tsx
import {
    Drawer,
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WebIcon from "@mui/icons-material/Language";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import BrushIcon from "@mui/icons-material/Brush";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FolderIcon from "@mui/icons-material/Folder";
import {Link, useLocation} from "react-router-dom";

import {useState} from "react";

type Props = {
    currentPage: string;
    setPage: (page: string) => void;
};

const AdminSidebar = ({currentPage, setPage}: Props) => {
    const [openPostManager, setOpenPostManager] = useState(false);
    const location = useLocation();

    return (
        <Drawer variant="permanent" anchor="left">
            <Box sx={{width: 240, pt: 2}}>
                <Typography variant="h6" sx={{px: 2, fontWeight: "bold", mb: 2}}>
                    Admin Panel
                </Typography>
                <List>
                    {/* Dashboard */}
                    <ListItemButton
                        component={Link}
                        to="/admin"
                        selected={location.pathname === "/admin"}
                    >
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItemButton>

                    {/* Post Manager (Toggle) */}
                    <ListItemButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenPostManager(!openPostManager);
                        }}
                    > <ListItemIcon>
                        <FolderIcon/>
                    </ListItemIcon>
                        <ListItemText primary="Post Manager"/>
                        {openPostManager ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    {/* Subpages */}
                    <Collapse in={openPostManager} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{pl: 4}}
                                component={Link} to="/admin/web-dev-post"
                            >
                                <ListItemIcon>
                                    <WebIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Web Dev Posts"/>
                            </ListItemButton>

                            <ListItemButton
                                sx={{pl: 4}}
                                component={Link} to="/admin/game-dev-post"
                            >
                                <ListItemIcon>
                                    <SportsEsportsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Game Dev Posts"/>
                            </ListItemButton>

                            <ListItemButton
                                sx={{pl: 4}}
                                component={Link} to="/admin/editing-post"
                            >
                                <ListItemIcon>
                                    <MovieFilterIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Editing"/>
                            </ListItemButton>

                            <ListItemButton
                                sx={{pl: 4}}
                                component={Link} to="/admin/vfx-post"
                            >
                                <ListItemIcon>
                                    <BrushIcon/>
                                </ListItemIcon>
                                <ListItemText primary="VFX"/>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Divider sx={{my: 2}}/>

                    {/* Create Post */}
                    <ListItemButton
                        component={Link}
                        to="/admin/create-post"
                        selected={location.pathname === "/admin/create-post"}
                    >
                        <ListItemIcon>
                            <AddBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Create a Post"/>
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default AdminSidebar;