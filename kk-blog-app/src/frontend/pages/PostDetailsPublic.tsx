import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../backend/firebaseConfig";
import {
    Box,
    Typography,
    Avatar,
    Stack,
    CircularProgress,
} from "@mui/material";

const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const PostDetailsPublic = () => {
    const { collection, id } = useParams(); // URL: /:collection/:id
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!collection || !id) return;

        const fetchPost = async () => {
            try {
                const ref = doc(db, `${collection}_collection`, id);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    setPost({ id: snap.id, ...snap.data() });
                } else {
                    console.warn("⚠️ Post not found.");
                }
            } catch (error) {
                console.error("❌ Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [collection, id]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return (
            <Typography sx={{ mt: 5, textAlign: "center" }}>
                Post not found.
            </Typography>
        );
    }

    const authorName =
        typeof post.author === "object" && post.author?.username
            ? post.author.username
            : "Unknown";

    const authorInitial = authorName[0]?.toUpperCase() || "U";


    return (
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
            {post.thumbnailUrl && (
                <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    style={{
                        width: "100%",
                        borderRadius: 8,
                        maxHeight: 400,
                        objectFit: "cover",
                        marginBottom: "30px",
                    }}
                />
            )}

            <Typography variant="h3" fontWeight="bold" sx={{ mt: 3 }}>
                {post.title}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>{authorInitial}</Avatar>
                <Typography fontWeight={500}>{authorName}</Typography>
                <Typography color="text.secondary" sx={{ ml: "auto" }}>
                    {formatDate(post.createdAt)}
                </Typography>
            </Stack>

            <Box
                sx={{
                    mt: 4,
                    fontSize: 18,
                    lineHeight: 1.8,
                    "& img": { maxWidth: "100%", borderRadius: 4 },
                }}
                dangerouslySetInnerHTML={{
                    __html: post.content || "<p>No content available.</p>",
                }}
            />
        </Box>
    );
};

export default PostDetailsPublic;
