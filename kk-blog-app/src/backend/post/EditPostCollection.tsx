// pages/EditPost.tsx
import { useEffect, useState, useRef, useMemo } from "react";
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
    Paper,
    MenuItem, // Added
    Dialog, // Added
    DialogTitle, // Added
    DialogContent, // Added
    DialogActions, // Added
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Copied from CreatePost (with corrected YouTube URL)
const convertYouTubeUrlToEmbed = (url: string): string | null => {
    // Regex to capture YouTube video ID from various URL formats
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})(?:\S+)?/
    );
    // Correct embed URL format
    return match ? `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${match[1]}"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>` : null;
};


// Copied from CreatePost
const categories = [
    { value: "web_dev_collection", label: "Web Dev" },
    { value: "game_dev_collection", label: "Game Dev" },
    { value: "editing_collection", label: "Editing" },
    { value: "visual_effects_collection", label: "VFX" },
];

const EditPostCollection = () => {
    const { collectionName, postId } = useParams();
    const navigate = useNavigate();

    // State from original EditPost
    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [content, setContent] = useState("");

    // State added from CreatePost
    const [category, setCategory] = useState(categories[0].value); // Default category
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [videoDialogOpen, setVideoDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const quillRef = useRef<ReactQuill>(null); // Added Ref with type

    // Modules definition copied from CreatePost
    const quillModules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike", "code-block"], // Added code-block
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "image", "video", "code"], // Added video, code
                ["clean"],
            ],
            handlers: {
                image: () => setImageDialogOpen(true),
                video: () => setVideoDialogOpen(true),
                code: function(this: any) { // Added code handler
                    const code = prompt("Paste your code:");
                    if (code && quillRef.current) {
                        const editor = quillRef.current.getEditor();
                        const range = editor.getSelection();
                        if (range) {
                            editor.insertText(range.index, "\n"); // Add newline before
                            editor.clipboard.dangerouslyPasteHTML(
                                range.index + 1, // Paste after newline
                                `<pre class="ql-syntax" spellcheck="false">${code}</pre>`
                            );
                            editor.setSelection(range.index + 2, 0); // Move cursor after inserted block
                        } else {
                            // Fallback if no selection (e.g., editor empty)
                            editor.clipboard.dangerouslyPasteHTML(0, `<pre class="ql-syntax" spellcheck="false">${code}</pre>`);
                        }
                    }
                }
            }
        },
        // syntax: true, // Uncomment if you set up highlight.js syntax highlighting
    }), []); // Empty dependency array ensures this object is created only once


    // Existing useEffect modified to fetch category
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
                setCategory(data.category || categories[0].value); // Fetch category or use default
            } else {
                console.error("No such document!");
                // Optionally navigate away or show an error message
                // navigate('/admin');
            }
        };
        fetchPost();
    }, [collectionName, postId]); // Dependencies remain the same


    // Handler functions copied from CreatePost
    const handleInsertImage = () => {
        if (quillRef.current && imageUrl) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            // Insert image at cursor position, use 'user' source
            editor.insertEmbed(range?.index || editor.getLength(), "image", imageUrl, "user");
        }
        setImageDialogOpen(false);
        setImageUrl("");
    };

    const handleInsertVideo = () => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const embed = convertYouTubeUrlToEmbed(videoUrl); // Use the (corrected) helper
            if (embed) {
                const range = editor.getSelection();
                // Paste HTML at cursor position
                editor.clipboard.dangerouslyPasteHTML(range?.index || editor.getLength(), embed);
            } else {
                alert("Invalid YouTube URL provided.");
            }
        }
        setVideoDialogOpen(false);
        setVideoUrl("");
    };

    // Existing handleUpdate modified to include category
    const handleUpdate = async () => {
        // Added category to the validation check
        if (!title || !thumbnailUrl || !content || !category || !collectionName || !postId) {
            alert("Please fill in all required fields (Title, Thumbnail, Content, Category).");
            return;
        }
        try {
            const docRef = doc(db, collectionName, postId);
            await updateDoc(docRef, {
                title,
                thumbnailUrl,
                content,
                category, // Add category to the updated data
                updatedAt: serverTimestamp(),
            });
            alert("Post updated successfully!");
            navigate("/admin"); // Or wherever you want to redirect after update
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update post.");
        }
    };

    // Formats array added from CreatePost
    const quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'code-block', // Added code-block
        'list', 'bullet',
        'align', // Added align
        'link', 'image', 'video', 'code' // Added video, code
    ];


    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 6 /* Added bottom margin */ }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Edit Post
            </Typography>

            {/* Title */}
            <TextField
                label="Post Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Thumbnail */}
            <TextField
                label="Thumbnail Image URL" // Kept consistent label
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
                        style={{ width: "100%", maxHeight: 300, objectFit: "cover", display: 'block' /* Fix potential img spacing issues */}}
                    />
                </Paper>
            )}

            {/* Category Select - Added from CreatePost */}
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

            {/* Image URL Dialog - Added from CreatePost */}
            <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Insert Image URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Image URL"
                        fullWidth
                        variant="outlined" // Changed variant for consistency
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

            {/* YouTube URL Dialog - Added from CreatePost */}
            <Dialog open={videoDialogOpen} onClose={() => setVideoDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Insert YouTube URL</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="YouTube Video URL" // Slightly clearer label
                        fullWidth
                        variant="outlined" // Changed variant for consistency
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


            {/* ReactQuill editor updated */}
            <ReactQuill
                ref={quillRef} // Added ref
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules} // Use memoized modules with handlers
                formats={quillFormats} // Added formats
                style={{ minHeight: '400px', marginBottom: '30px' }} // Matched style
                placeholder="Edit your post content here..." // Added placeholder
            />

            {/* Update Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ fontWeight: "bold", mt: 3 }} // Adjusted margin top
                size="large" // Added size
            >
                Update Post
            </Button>
        </Box>
    );
};

export default EditPostCollection;