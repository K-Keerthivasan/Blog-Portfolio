import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActionArea
} from "@mui/material";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

export type Post = {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: Timestamp | null;
    author: string | { username: string };
    collection: string;
};

type Props = {
    posts: Post[];
    baseRoute: string;
};

const formatDate = (timestamp: Timestamp | null | undefined): string => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const PostCardGrid = ({ posts }: Props) => {
    return (
        <Grid container spacing={3}>
            {posts.map((post) => {
                const author =
                    typeof post.author === "object"
                        ? post.author.username
                        : post.author;

                const postedDate = formatDate(post.createdAt);

                return (
                    <Grid  size ={{xs:12, sm:6, md:4, lg:3}}  key={post.id}>
                        <Card>
                            <CardActionArea
                                component={Link}
                                to={`/${post.collection.replace("_collection", "")}/${post.id}`}
                            >
                                <CardMedia
                                    component="img"
                                    height="260"
                                    image={post.thumbnailUrl}
                                    alt={post.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom noWrap>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {author || "Unknown"}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {postedDate && `Posted on ${postedDate}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PostCardGrid;
