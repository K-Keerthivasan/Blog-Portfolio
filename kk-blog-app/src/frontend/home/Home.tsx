import { useEffect, useState } from "react";
import { Box, Divider, Typography, Button, Stack } from "@mui/material";
import { db } from "../../backend/firebaseConfig";
import PostCardGrid from "./PostCardGrid";
import type { Post } from "./PostCardGrid";
import {
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const [codePosts, setCodePosts] = useState<Post[]>([]);
    const [filmPosts, setFilmPosts] = useState<Post[]>([]);
    const [latestPosts, setLatestPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const allCollections = [
                "web_dev_collection",
                "game_dev_collection",
                "editing_collection",
                "visual_effects_collection",
            ];

            const allPosts: Post[] = [];
            const code: Post[] = [];
            const film: Post[] = [];

            for (const col of allCollections) {
                const q = query(collection(db, col), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const docs: Post[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    thumbnailUrl: doc.data().thumbnailUrl,
                    createdAt: doc.data().createdAt,
                    author: doc.data().author,
                    collection: col,
                }));

                allPosts.push(...docs);

                if (col === "web_dev_collection" || col === "game_dev_collection") {
                    code.push(...docs);
                }

                if (col === "editing_collection" || col === "visual_effects_collection") {
                    film.push(...docs);
                }
            }

            const sorted = allPosts
                .filter(post => post.createdAt)
                .sort(
                    (a, b) =>
                        (b.createdAt?.toMillis?.() || 0) -
                        (a.createdAt?.toMillis?.() || 0)
                );

            setLatestPosts(sorted.slice(0, 4));
            setCodePosts(code.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)));
            setFilmPosts(film.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)));
        };

        fetchPosts();
    }, []);

    const renderSectionHeader = (
        title: string,
        subtitle: string,
        showButton: boolean,
        route: string
    ) => (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "520" }}>
                    {title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {subtitle}
                </Typography>
            </Box>
            {showButton && (
                <Button
                    variant="outlined"
                    onClick={() => navigate(route)}
                    sx={{ mt: { xs: 2, md: 0 }, height: "fit-content" }}
                >
                    View More
                </Button>
            )}
        </Stack>
    );

    return (
        <Box sx={{ padding: 2 }}>
            {/* 🔹 Latest Buzz */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "520" }}>
                Latest Buzz
            </Typography>
            <Typography variant="body1" gutterBottom>
                Stay updated with the latest thoughts, tutorials, and updates
            </Typography>
            <PostCardGrid posts={latestPosts} baseRoute="blog" />
            <Divider sx={{ my: 4, borderBottomWidth: 4 }} />

            {/* 🔹 Code Stuff */}
            {renderSectionHeader(
                "💡 Code Stuff",
                "Dive into development, tools, game dev, and all things tech — from quick fixes to deep dives.",
                codePosts.length > 4,
                "/web-dev"
            )}
            <PostCardGrid posts={codePosts.slice(0, 4)} baseRoute="blog" />
            <Divider sx={{ my: 4, borderBottomWidth: 4 }} />

            {/* 🔹 Frame by Frame */}
            {renderSectionHeader(
                "🎥 Frame by Frame",
                "Exploring storytelling, editing, VFX tricks, and post-production diaries.",
                filmPosts.length > 4,
                "/editing"
            )}
            <PostCardGrid posts={filmPosts.slice(0, 4)} baseRoute="blog" />
        </Box>
    );
};

export default Home;
