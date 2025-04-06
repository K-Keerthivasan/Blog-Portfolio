import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
const formatDate = (timestamp) => {
    if (!timestamp || !(timestamp instanceof Timestamp))
        return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
const PostCardGrid = ({ posts }) => {
    return (_jsx(Grid, { container: true, spacing: 3, children: posts.map((post) => {
            const author = typeof post.author === "object"
                ? post.author.username
                : post.author;
            const postedDate = formatDate(post.createdAt);
            return (_jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 3 }, children: _jsx(Card, { children: _jsxs(CardActionArea, { component: Link, to: `/${post.collection.replace("_collection", "")}/${post.id}`, children: [_jsx(CardMedia, { component: "img", height: "260", image: post.thumbnailUrl, alt: post.title }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, noWrap: true, children: post.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", noWrap: true, children: author || "Unknown" }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: postedDate && `Posted on ${postedDate}` })] })] }) }) }, post.id));
        }) }));
};
export default PostCardGrid;
