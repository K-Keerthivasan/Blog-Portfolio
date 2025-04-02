// ✅ Updated PostList.tsx (Backend Admin View)
import {useEffect, useState} from "react";
import {
    collection,
    query,
    orderBy,
    getDocs,
    DocumentData,
    Timestamp
} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Grid,
    Box,
    Button, Container,
} from "@mui/material";

import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

type PostListProps = {
    collectionName: string;
};

const PostList = ({collectionName}: PostListProps) => {
    const [posts, setPosts] = useState<DocumentData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
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
        };

        fetchPosts();
    }, [collectionName]);

    return (
        <Box>
            <Container maxWidth="xl">
                <Typography variant="h5" sx={{mb: 3}}>
                    {(collectionName || "Untitled").replace(/_/g, " ").toUpperCase()} Posts
                </Typography>

                <Grid container spacing={3}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                            <Card sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={post.thumbnailUrl}
                                        alt={post.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {post.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxHeight: "4.5em", // approx 3 lines
                                            }}
                                            dangerouslySetInnerHTML={{__html: post.content}}
                                        />

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{mt: 1, display: "block"}}
                                        >
                                            Edited on: {formatDate(post.createdAt)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Box sx={{px: 2, pb: 2, mt: "auto"}}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<EditIcon/>}
                                        onClick={() => navigate(`/edit/${collectionName}/${post.id}`)}
                                    >
                                        Edit
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default PostList;
