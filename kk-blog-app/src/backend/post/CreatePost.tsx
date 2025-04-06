import { useRef, useState, useMemo } from "react";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const convertYouTubeUrlToEmbed = (url: string): string | null => {
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
    );
    return match ? `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${match[1]}" 
        frameborder="0" allowfullscreen></iframe>` : null;
};

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
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [videoDialogOpen, setVideoDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const quillRef = useRef<ReactQuill>(null);

    const quillModules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "image", "video", "code"],
                ["clean"],
            ],
            handlers: {
                image: () => setImageDialogOpen(true),
                video: () => setVideoDialogOpen(true),
                code: function(this: any) {
                    const code = prompt("Paste your code:");
                    if (code && quillRef.current) {
                        const editor = quillRef.current.getEditor();
                        const range = editor.getSelection();
                        editor.insertText(range?.index || 0, "\n");
                        editor.clipboard.dangerouslyPasteHTML(
                            range?.index || 0,
                            `<pre class="ql-syntax" spellcheck="false">${code}</pre>`
                        );
                    }
                }
            }
        },
    }), []);

    const handleInsertImage = () => {
        if (quillRef.current && imageUrl) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range?.index || 0, "image", imageUrl, "user");
        }
        setImageDialogOpen(false);
        setImageUrl("");
    };

    const handleInsertVideo = () => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const embed = convertYouTubeUrlToEmbed(videoUrl);
            if (embed) {
                const range = editor.getSelection();
                editor.clipboard.dangerouslyPasteHTML(range?.index || 0, embed);
            } else {
                alert("Invalid YouTube URL");
            }
        }
        setVideoDialogOpen(false);
        setVideoUrl("");
    };

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
                    username: "keerthi",
                },
            });

            alert("Post published!");
            setTitle("");
            setThumbnailUrl("");
            setContent("");
        } catch (error) {
            console.error("Error publishing post:", error);
            alert("Failed to publish post.");
        }
    };

    return (
        <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Create a New Blog Post
            </Typography>

            {/* Title Input */}
            <TextField
                label="Post Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Thumbnail Input */}
            <TextField
                label="Thumbnail Image URL"
                fullWidth
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Thumbnail Preview */}
            {thumbnailUrl && (
                <Paper elevation={3} sx={{ mb: 3 }}>
                    <img
                        src={thumbnailUrl}
                        alt="Post Thumbnail"
                        style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                    />
                </Paper>
            )}

            {/* Category Select */}
            <TextField
                select
                label="Category"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mb: 2 }}
            >
                {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                    </MenuItem>
                ))}
            </TextField>

            {/* Image URL Dialog */}
            <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)}>
                <DialogTitle>Insert Image URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        variant="standard"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleInsertImage}>Insert</Button>
                </DialogActions>
            </Dialog>

            {/* YouTube URL Dialog */}
            <Dialog open={videoDialogOpen} onClose={() => setVideoDialogOpen(false)}>
                <DialogTitle>Insert YouTube URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="YouTube URL"
                        fullWidth
                        variant="standard"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVideoDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleInsertVideo}>Insert</Button>
                </DialogActions>
            </Dialog>

            {/* Rich Text Editor */}
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                placeholder="Write your blog content here..."
                style={{ minHeight: "400px", marginBottom: "30px" }}
                formats={[
                    "header",
                    "bold", "italic", "underline", "strike",
                    "list", "bullet",
                    "link", "image", "video", "code-block"
                ]}
            />

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ fontWeight: "bold", mt: 3, mb: 6 }}
                size="large"
            >
                Publish Post
            </Button>
        </Box>
    );
};

export default CreatePost;