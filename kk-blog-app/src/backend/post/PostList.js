import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// ✅ Updated PostList.tsx (Backend Admin View)
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Typography, Card, CardMedia, CardContent, CardActionArea, Grid, Box, Button, Container, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
const formatDate = (timestamp) => {
    if (!timestamp || !(timestamp instanceof Timestamp))
        return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
const PostList = ({ collectionName }) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const handleDelete = async () => {
        if (!postToDelete)
            return;
        try {
            await deleteDoc(doc(db, collectionName, postToDelete));
            setPosts((prev) => prev.filter((post) => post.id !== postToDelete));
            setPostToDelete(null);
            setOpenDialog(false);
        }
        catch (err) {
            console.error("Error deleting post:", err);
        }
    };
    useEffect(() => {
        const fetchPosts = async () => {
            const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const postData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postData);
        };
        fetchPosts();
    }, [collectionName]);
    return (_jsx(Box, { children: _jsxs(Container, { maxWidth: "xl", children: [_jsxs(Typography, { variant: "h5", sx: { mb: 3 }, children: [(collectionName || "Untitled").replace(/_/g, " ").toUpperCase(), " Posts"] }), _jsx(Grid, { container: true, spacing: 3, children: posts.map((post) => (_jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 3 }, component: "div", children: _jsxs(Card, { sx: { display: "flex", flexDirection: "column", height: "100%" }, children: [_jsxs(CardActionArea, { children: [_jsx(CardMedia, { component: "img", height: "180", image: post.thumbnailUrl, alt: post.title }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: post.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: {
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        maxHeight: "4.5em", // approx 3 lines
                                                    }, dangerouslySetInnerHTML: { __html: post.content } }), _jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { mt: 1, display: "block" }, children: ["Edited on: ", formatDate(post.createdAt)] })] })] }), _jsxs(Box, { sx: { px: 2, pb: 2, mt: "auto" }, children: [_jsx(Button, { variant: "outlined", fullWidth: true, startIcon: _jsx(EditIcon, {}), onClick: () => navigate(`/admin/edit/${collectionName}/${post.id}`), children: "Edit" }), _jsx(Button, { variant: "outlined", fullWidth: true, color: "error", startIcon: _jsx(DeleteIcon, {}), onClick: () => {
                                                setPostToDelete(post.id);
                                                setOpenDialog(true);
                                            }, children: "Delete" })] })] }) }, post.id))) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), children: [_jsx(DialogTitle, { children: "Confirm Deletion" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { children: "Are you sure you want to delete this post? This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenDialog(false), children: "Cancel" }), _jsx(Button, { onClick: handleDelete, color: "error", children: "Delete" })] })] })] }) }));
};
export default PostList;
