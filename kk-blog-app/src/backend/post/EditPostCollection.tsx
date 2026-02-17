// pages/EditPost.tsx
import { useEffect, useState, useRef, useMemo } from "react";
import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const convertYouTubeUrlToEmbed = (url: string): string | null => {
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})(?:\S+)?/
    );
    return match ? `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${match[1]}"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>` : null;
};

const categories = [
    { value: "web_dev_collection", label: "Web Dev" },
    { value: "game_dev_collection", label: "Game Dev" },
    { value: "editing_collection", label: "Editing" },
    { value: "visual_effects_collection", label: "VFX" },
];

const EditPostCollection = () => {
    const { collectionName, postId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(categories[0].value);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [videoDialogOpen, setVideoDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const quillRef = useRef<ReactQuill>(null);
    const [insertIndex, setInsertIndex] = useState<number | null>(null);

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
                code: () => {
                    const code = prompt("Paste your code:");
                    if (code && quillRef.current) {
                        const editor = quillRef.current.getEditor();
                        const range = editor.getSelection();
                        if (range) {
                            editor.insertText(range.index, "\n");
                            editor.clipboard.dangerouslyPasteHTML(
                                range.index,
                                `<pre class="ql-syntax" spellcheck="false">${code.trim()}</pre>`
                            );
                            editor.setSelection(range.index + code.length, 0);
                        } else {
                            editor.clipboard.dangerouslyPasteHTML(0, `<pre class="ql-syntax">${code}</pre>`);
                        }
                    }
                }
            }
        }
    }), []);

    const quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'code-block',
        'list', 'bullet',
        'align',
        'link', 'image', 'video', 'code'
    ];

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
                setCategory(data.category || categories[0].value);
            } else {
                console.error("No such document!");
            }
        };
        fetchPost();
    }, [collectionName, postId]);

    // Markdown-style shortcuts: /image, /video, /code
    useEffect(() => {
        if (!quillRef.current) return;

        const editor = quillRef.current.getEditor();
        const quillContainer = quillRef.current?.editor?.root;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Enter") {
                const selection = editor.getSelection();
                if (!selection) return;

                const [line] = editor.getLine(selection.index);
                const lineText = line.domNode?.textContent?.trim();

                if (lineText === "/image") {
                    e.preventDefault();
                    setInsertIndex(selection.index - 6); // Save position before deleting
                    editor.deleteText(selection.index - 6, 6);
                    setImageDialogOpen(true);
                } else if (lineText === "/video") {
                    e.preventDefault();
                    setInsertIndex(selection.index - 6); // Save position before deleting
                    editor.deleteText(selection.index - 6, 6);
                    setVideoDialogOpen(true);
                } else if (lineText === "/code") {
                    e.preventDefault();
                    editor.deleteText(selection.index - 5, 5);
                    const code = prompt("Paste your code:");
                    if (code) {
                        editor.clipboard.dangerouslyPasteHTML(
                            selection.index - 5,
                            `<pre class="ql-syntax" spellcheck="false">${code.trim()}</pre>`
                        );
                        editor.setSelection(selection.index - 5 + code.length, 0);

                    }
                }
            }
        };

        quillContainer?.addEventListener("keydown", handleKeyDown);
        return () => {
            quillContainer?.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleInsertImage = () => {
        if (quillRef.current && imageUrl && insertIndex !== null) {
            const editor = quillRef.current.getEditor();
            editor.insertEmbed(insertIndex, "image", imageUrl.trim(), "user");
            editor.setSelection(insertIndex + 1, 0);
        }
        setImageDialogOpen(false);
        setImageUrl("");
        setInsertIndex(null); // reset after use
    };


    const handleInsertVideo = () => {
        if (quillRef.current && videoUrl && insertIndex !== null) {
            const editor = quillRef.current.getEditor();
            const embed = convertYouTubeUrlToEmbed(videoUrl);
            if (embed) {
                editor.clipboard.dangerouslyPasteHTML(insertIndex, `<div>${embed.trim()}</div>`);
                editor.setSelection(insertIndex + 1, 0);
            }
        }
        setVideoDialogOpen(false);
        setVideoUrl("");
        setInsertIndex(null); // reset after use
    };



    const handleUpdate = async () => {
        if (!title || !thumbnailUrl || !content || !category || !collectionName || !postId) {
            alert("Fill in all fields: Title, Thumbnail, Content, Category.");
            return;
        }
        try {
            const docRef = doc(db, collectionName, postId);
            await updateDoc(docRef, {
                title,
                thumbnailUrl,
                content,
                category,
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
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 6 }}>
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
                        style={{ width: "100%", maxHeight: 300, objectFit: "cover", display: 'block' }}
                    />
                </Paper>
            )}

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

            <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Insert Image URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        variant="outlined"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleInsertImage} variant="contained">Insert</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={videoDialogOpen} onClose={() => setVideoDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Insert YouTube URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="YouTube Video URL"
                        fullWidth
                        variant="outlined"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVideoDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleInsertVideo} variant="contained">Insert</Button>
                </DialogActions>
            </Dialog>

            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                style={{ minHeight: '400px', marginBottom: '30px' }}
                placeholder="Edit your post content here..."
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ fontWeight: "bold", mt: 3 }}
                size="large"
            >
                Update Post
            </Button>
        </Box>
    );
};

export default EditPostCollection;
