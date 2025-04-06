import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, Timestamp, } from "firebase/firestore";
import { db } from "../../backend/firebaseConfig.tsx";
import { Typography, Grid, Box, Avatar, Stack, Divider, } from "@mui/material";
import { Link } from "react-router-dom";
const formatDate = (timestamp) => {
    if (!timestamp || !(timestamp instanceof Timestamp))
        return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
const PostListPublic = ({ collectionName }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const postData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postData);
            }
            catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [collectionName]);
    return (_jsx(Box, { sx: { px: { xs: 2, sm: 4 }, py: 3 }, children: _jsx(Grid, { container: true, spacing: 5, direction: "column", children: posts.map((post) => {
                const authorName = typeof post.author === "object" && post.author?.username
                    ? post.author.username
                    : "Unknown";
                const avatarInitial = authorName[0]?.toUpperCase() || "U";
                return (_jsxs(Grid, { children: [_jsx(Link, { to: `/${collectionName.replace("_collection", "")}/${post.id}`, style: { textDecoration: "none", color: "inherit" }, children: _jsxs(Grid, { container: true, spacing: 3, alignItems: "center", sx: { flexWrap: "nowrap" }, children: [_jsx(Grid, { size: { xs: 12, md: 4 }, children: _jsx("img", { src: post.thumbnailUrl, alt: post.title, style: {
                                                width: "80%",
                                                borderRadius: 8,
                                                objectFit: "cover",
                                                maxHeight: 180,
                                                height: "100%",
                                            } }) }), _jsx(Grid, { size: { xs: 12, md: 8 }, children: _jsxs(Stack, { spacing: 1, children: [_jsxs(Typography, { variant: "caption", color: "primary", fontWeight: 600, children: ["#", collectionName
                                                            .replace("_collection", "")
                                                            .replace("_", " ")
                                                            .toUpperCase()] }), _jsx(Typography, { variant: "h5", fontWeight: "bold", sx: { lineHeight: 1.3 }, children: post.title }), _jsxs(Stack, { direction: "row", alignItems: "center", spacing: 1, children: [_jsx(Avatar, { sx: { width: 32, height: 32 }, children: avatarInitial }), _jsx(Typography, { fontWeight: 500, children: authorName }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { marginLeft: "auto" }, children: formatDate(post.createdAt) })] })] }) })] }) }), _jsx(Divider, { sx: { my: 4 } })] }, post.id));
            }) }) }));
};
export default PostListPublic;
