import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Paper, } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const convertYouTubeUrlToEmbed = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    if (!match)
        return null;
    const videoId = match[1];
    return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" allowfullscreen></iframe>`;
};
const quillModules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
        handlers: {
            image: function () {
                const url = prompt("Enter Image URL:");
                if (url) {
                    const range = this.quill.getSelection();
                    this.quill.insertEmbed(range?.index || 0, "image", url);
                }
            },
            video: function () {
                const url = prompt("Enter YouTube video URL:");
                if (!url)
                    return; // ✅ skip if user cancels
                const embed = convertYouTubeUrlToEmbed(url);
                if (embed) {
                    const range = this.quill.getSelection();
                    this.quill.clipboard.dangerouslyPasteHTML(range?.index || 0, embed);
                }
                else {
                    alert("Invalid YouTube URL");
                }
            }
        },
    },
};
// 🏷️ Categories for selection
const categories = [
    { value: "web_dev_collection", label: "Web Dev" },
    { value: "game_dev_collection", label: "Game Dev" },
    { value: "editing_collection", label: "Editing" },
    { value: "visual_effects_collection", label: "VFX" },
];
const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(categories[0].value);
    const handleSubmit = async () => {
        if (!title || !thumbnailUrl || !content) {
            alert("Please fill in all fields");
            return;
        }
        try {
            await addDoc(collection(db, category), {
                title,
                thumbnailUrl,
                content,
                createdAt: serverTimestamp(),
                author: {
                    email: "kkvasan99@gmail.com",
                    username: "keerthi", // 👈 add your preferred name here
                },
            });
            alert("Post published!");
            setTitle("");
            setThumbnailUrl("");
            setContent("");
        }
        catch (error) {
            console.error("Error publishing post:", error);
            alert("Failed to publish post.");
        }
    };
    return (_jsxs(Box, { sx: { maxWidth: "900px", mx: "auto", mt: 4 }, children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", gutterBottom: true, children: "Create a New Blog Post" }), _jsx(TextField, { label: "Post Title", fullWidth: true, value: title, onChange: (e) => setTitle(e.target.value), sx: { mb: 2 } }), _jsx(TextField, { label: "Thumbnail Image URL", fullWidth: true, value: thumbnailUrl, onChange: (e) => setThumbnailUrl(e.target.value), sx: { mb: 2 } }), thumbnailUrl && (_jsx(Paper, { elevation: 3, sx: { mb: 3 }, children: _jsx("img", { src: thumbnailUrl, alt: "Post Thumbnail", style: { width: "100%", maxHeight: "300px", objectFit: "cover" } }) })), _jsx(TextField, { select: true, label: "Category", fullWidth: true, value: category, onChange: (e) => setCategory(e.target.value), sx: { mb: 2 }, children: categories.map((cat) => (_jsx(MenuItem, { value: cat.value, children: cat.label }, cat.value))) }), _jsx(ReactQuill, { theme: "snow", value: content, onChange: setContent, modules: quillModules, placeholder: "Write your blog content here...", style: { minHeight: "250px", marginBottom: "30px" } }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleSubmit, sx: { fontWeight: "bold" }, children: "Publish Post" })] }));
};
export default CreatePost;
