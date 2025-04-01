import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Box, Button, Typography } from "@mui/material";
import Dashboard from "./Dashboard.tsx";
import PostManager from "./PostManager.tsx";


import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig.tsx"; // assuming you exported it properly

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
            <Box sx={{ padding: 5, flexGrow: 1 ,    }}>
                {page === "dashboard" && <Dashboard />}
                 {page === "manage-project" && <PostManager />}
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