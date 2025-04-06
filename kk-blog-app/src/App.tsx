import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {JSX, useState} from "react";
import {ThemeProvider, CssBaseline, Box} from "@mui/material";
import './App.css'
import Navbar from "./frontend/Navbar.tsx";
import Home from "./frontend/home/Home.tsx";
import Footer from "./frontend/Footer.tsx";
import {darkTheme, lightTheme} from "./frontend/theme.tsx";
import ThemeTesterText from "./frontend/Testing/ThemeTesterText.tsx";
import ComponentsTester from "./frontend/Testing/ComponentsTester.tsx";
import Login from "./backend/Login.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";
import AdminPanel from "./backend/Admin/AdminPanel.tsx";
import {Navigate} from "react-router-dom";
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
document.addEventListener(
    "touchstart",
    () => {
    },
    {passive: false} // override default passive behavior
);


const ProtectedRoute = ({children}: { children: JSX.Element }) => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    if (loading) return <p>Loading...</p>; // Optional: loading spinner
    if (!user || user.email !== "kkvasan99@gmail.com") return <Navigate to="/login" replace/>;

    return children;
};



function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Router>
                    <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

                    <Box sx={{ flex: 1 }}>
                        <Routes>
                            {/* 👇 Public Pages */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/text-tester" element={<ThemeTesterText />} />
                            <Route path="/design-tester" element={<ComponentsTester />} />

                            {/* Public Blog List Routes */}

                            <Route path="/blog/:id" element={<PostDetailsPublic />} />


                            <Route path="/web-dev" element={<PostListPublic collectionName="web_dev_collection" />} />
                            <Route path="/game-dev" element={<PostListPublic collectionName="game_dev_collection" />} />
                            <Route path="/editing" element={<PostListPublic collectionName="editing_collection" />} />
                            <Route path="/vfx" element={<PostListPublic collectionName="visual_effects_collection" />} />

                            {/* Public Blog Post Details */}
                            <Route path="/:collection/:id" element={<PostDetailsPublic />} />



                            {/* Protected Admin Routes */}
                            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                            <Route path="/admin/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                            <Route path="/admin/edit/:collectionName/:postId" element={<ProtectedRoute><EditPostCollection /></ProtectedRoute>} />
                            <Route path="/admin/web-dev-post" element={<ProtectedRoute><WebDevPostAdmin /></ProtectedRoute>} />
                            <Route path="/admin/game-dev-post" element={<ProtectedRoute><GameDevPostAdmin /></ProtectedRoute>} />
                            <Route path="/admin/vfx-post" element={<ProtectedRoute><VFXPostAdmin /></ProtectedRoute>} />
                            <Route path="/admin/editing-post" element={<ProtectedRoute><EditingPostAdmin /></ProtectedRoute>} />



                        </Routes>
                    </Box>

                    <Footer />
                </Router>
            </Box>
        </ThemeProvider>
    );
}



export default App
