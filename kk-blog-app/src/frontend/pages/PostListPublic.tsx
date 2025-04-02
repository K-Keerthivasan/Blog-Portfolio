import { useEffect, useState } from "react";
import {
    collection,
    query,
    orderBy,
    getDocs,
    DocumentData,
    Timestamp,
} from "firebase/firestore";
import { db } from "../../backend/firebaseConfig.tsx";
import {
    Typography,
    Grid,
    Box,
    Avatar,
    Stack,
    Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const formatDate = (timestamp: Timestamp | null | undefined): string => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

type PostPublicProps = {
    collectionName: string;
};

const PostListPublic = ({ collectionName }: PostPublicProps) => {
    const [posts, setPosts] = useState<DocumentData[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(
                    collection(db, collectionName),
                    orderBy("createdAt", "desc")
                );
                const snapshot = await getDocs(q);
                const postData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [collectionName]);

    return (
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
            <Grid container spacing={5} direction="column">
                {posts.map((post) => {
                    const authorName =
                        typeof post.author === "object"
                            ? post.author.username || "Unknown"
                            : post.author || "Unknown";

                    const avatarInitial =
                        typeof post.author === "object"
                            ? post.author.username?.[0]?.toUpperCase()
                            : post.author?.[0]?.toUpperCase();

                    return (
                        <Grid item key={post.id}>
                            <Link
                                to={`/${collectionName.replace("_collection", "")}/${post.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <img
                                            src={post.thumbnailUrl}
                                            alt={post.title}
                                            style={{
                                                width: "100%",
                                                borderRadius: 8,
                                                objectFit: "cover",
                                                maxHeight: 200,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8}>
                                        <Stack spacing={1}>
                                            <Typography
                                                variant="caption"
                                                color="primary"
                                                fontWeight={600}
                                            >
                                                #{collectionName
                                                .replace("_collection", "")
                                                .replace("_", " ")
                                                .toUpperCase()}
                                            </Typography>

                                            <Typography
                                                variant="h5"
                                                fontWeight="bold"
                                                sx={{ lineHeight: 1.3 }}
                                            >
                                                {post.title}
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
                                                sx={{ pt: 1 }}
                                            >
                                                <Avatar sx={{ width: 28, height: 28 }}>
                                                    {avatarInitial || "U"}
                                                </Avatar>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={500}
                                                >
                                                    {authorName}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ marginLeft: "auto" }}
                                                >
                                                    {formatDate(post.createdAt)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Link>
                            <Divider sx={{ my: 4 }} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default PostListPublic;
