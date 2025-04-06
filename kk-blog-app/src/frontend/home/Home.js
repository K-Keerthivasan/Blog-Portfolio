import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Divider, Typography, Button, Stack } from "@mui/material";
import { db } from "../../backend/firebaseConfig";
import PostCardGrid from "./PostCardGrid";
import { collection, getDocs, orderBy, query, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const [codePosts, setCodePosts] = useState([]);
    const [filmPosts, setFilmPosts] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPosts = async () => {
            const allCollections = [
                "web_dev_collection",
                "game_dev_collection",
                "editing_collection",
                "visual_effects_collection",
            ];
            const allPosts = [];
            const code = [];
            const film = [];
            for (const col of allCollections) {
                const q = query(collection(db, col), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const docs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    thumbnailUrl: doc.data().thumbnailUrl,
                    createdAt: doc.data().createdAt,
                    author: doc.data().author,
                    collection: col,
                }));
                allPosts.push(...docs);
                if (col === "web_dev_collection" || col === "game_dev_collection") {
                    code.push(...docs);
                }
                if (col === "editing_collection" || col === "visual_effects_collection") {
                    film.push(...docs);
                }
            }
            const sorted = allPosts
                .filter(post => post.createdAt)
                .sort((a, b) => (b.createdAt?.toMillis?.() || 0) -
                (a.createdAt?.toMillis?.() || 0));
            setLatestPosts(sorted.slice(0, 4));
            setCodePosts(code.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)));
            setFilmPosts(film.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)));
        };
        fetchPosts();
    }, []);
    const renderSectionHeader = (title, subtitle, showButton, route) => (_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: { fontWeight: "520" }, children: title }), _jsx(Typography, { variant: "body1", gutterBottom: true, children: subtitle })] }), showButton && (_jsx(Button, { variant: "outlined", onClick: () => navigate(route), sx: { mt: { xs: 2, md: 0 }, height: "fit-content" }, children: "View More" }))] }));
    return (_jsxs(Box, { sx: { padding: 2 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: { fontWeight: "520" }, children: "Latest Buzz" }), _jsx(Typography, { variant: "body1", gutterBottom: true, children: "Stay updated with the latest thoughts, tutorials, and updates" }), _jsx(PostCardGrid, { posts: latestPosts, baseRoute: "blog" }), _jsx(Divider, { sx: { my: 4, borderBottomWidth: 4 } }), renderSectionHeader("💡 Code Stuff", "Dive into development, tools, game dev, and all things tech — from quick fixes to deep dives.", codePosts.length > 4, "/web-dev"), _jsx(PostCardGrid, { posts: codePosts.slice(0, 4), baseRoute: "blog" }), _jsx(Divider, { sx: { my: 4, borderBottomWidth: 4 } }), renderSectionHeader("🎥 Frame by Frame", "Exploring storytelling, editing, VFX tricks, and post-production diaries.", filmPosts.length > 4, "/editing"), _jsx(PostCardGrid, { posts: filmPosts.slice(0, 4), baseRoute: "blog" })] }));
};
export default Home;
