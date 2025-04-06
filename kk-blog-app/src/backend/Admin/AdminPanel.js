import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { Box, Button, Typography } from "@mui/material";
import Dashboard from "./Dashboard.tsx";
import PostList from "../post/PostList.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig.tsx";
import CreatePost from "../post/CreatePost.tsx"; // assuming you exported it properly
const AdminPanel = () => {
    const [page] = useState("dashboard");
    const [user, loading] = useAuthState(auth);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully!");
        }
        catch (error) {
            console.error("Logout failed:", error);
        }
    };
    if (loading)
        return _jsx(Typography, { children: "Loading..." });
    if (!user)
        return _jsx(Typography, { children: "Access denied. Please log in." });
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { padding: 5, flexGrow: 1 }, children: [page === "dashboard" && _jsx(Dashboard, {}), page === "web-dev-post" && _jsx(PostList, { collectionName: "web_dev_collection" }), page === "game-dev" && _jsx(PostList, { collectionName: "game_dev_collection" }), page === "editing" && _jsx(PostList, { collectionName: "editing_collection" }), page === "vfx" && _jsx(PostList, { collectionName: "visual_effects_collection" }), page === "create-post" && _jsx(CreatePost, {})] }), _jsx(Button, { variant: "contained", color: "secondary", onClick: handleLogout, sx: { position: "absolute", top: 100, right: 10 }, children: "Logout" })] }));
};
export default AdminPanel;
