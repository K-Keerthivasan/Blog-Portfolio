// pages/EditPost.tsx
import { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
    useParams,
    useNavigate
} from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
    ]
};

const EditPostCollection = () => {
    const { collectionName, postId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            if (!collectionName || !postId) return;
            const docRef = doc(db, collectionName, postId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title || "");
                setThumbnailUrl(data.thumbnailUrl || "");
                setContent(data.content || "");
            }
        };
        fetchPost();
    }, [collectionName, postId]);

    const handleUpdate = async () => {
        if (!title || !thumbnailUrl || !content || !collectionName || !postId) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const docRef = doc(db, collectionName, postId);
            await updateDoc(docRef, {
                title,
                thumbnailUrl,
                content,
                updatedAt: serverTimestamp(),
            });
            alert("Post updated successfully!");
            navigate("/admin");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update post.");
        }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Edit Post
            </Typography>

            <TextField
                label="Post Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Thumbnail Image URL"
                fullWidth
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                sx={{ mb: 2 }}
            />

            {thumbnailUrl && (
                <Paper elevation={3} sx={{ mb: 3 }}>
                    <img
                        src={thumbnailUrl}
                        alt="Post Thumbnail"
                        style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
                    />
                </Paper>
            )}

            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                style={{ minHeight: 250, marginBottom: 30 }}
            />

            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Post
            </Button>
        </Box>
    );
};

export default EditPostCollection;
