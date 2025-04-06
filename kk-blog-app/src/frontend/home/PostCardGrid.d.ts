import { Timestamp } from "firebase/firestore";
export type Post = {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: Timestamp | null;
    author: string | {
        username: string;
    };
    collection: string;
};
type Props = {
    posts: Post[];
    baseRoute: string;
};
declare const PostCardGrid: ({ posts }: Props) => import("react/jsx-runtime").JSX.Element;
export default PostCardGrid;
