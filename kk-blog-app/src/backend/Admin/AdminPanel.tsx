import { useState } from "react";
import {signOut } from "firebase/auth";
import { Box, Button, Typography } from "@mui/material";
import Dashboard from "./Dashboard.tsx";
import PostList from "../post/PostList.tsx";



import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig.tsx";
import CreatePost from "../post/CreatePost.tsx"; // assuming you exported it properly

const AdminPanel: React.FC = () => {
    const [page] = useState("dashboard");


     const [user, loading] = useAuthState(auth);



    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!user) return <Typography>Access denied. Please log in.</Typography>;

    return (
        <Box>

            {/* Main Content */}
            <Box sx={{ padding: 5, flexGrow: 1 }}>
                {page === "dashboard" && <Dashboard />}
                {page === "web-dev-post" && <PostList collectionName="web_dev_collection" />}
                {page === "game-dev" && <PostList collectionName="game_dev_collection" />}
                {page === "editing" && <PostList collectionName="editing_collection" />}
                {page === "vfx" && <PostList collectionName="visual_effects_collection" />}
                {page === "create-post" && <CreatePost />}

            </Box>


            {/* Logout Button */}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ position: "absolute", top: 100, right: 10 }}
            >
                Logout
            </Button>

        </Box>
    )
}

export default  AdminPanel;