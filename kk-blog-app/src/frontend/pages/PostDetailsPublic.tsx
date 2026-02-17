import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {doc, getDoc, Timestamp} from 'firebase/firestore';
import {db} from '../../backend/firebaseConfig';
import {
    Box,
    Typography,
    Avatar,
    Stack,
    CircularProgress,
    IconButton,
    Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import parse, {DOMNode, Element} from 'html-react-parser';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Helmet} from 'react-helmet-async';

interface PostData {
    id: string;
    title: string;
    content: string;
    thumbnailUrl?: string;
    createdAt: Timestamp;
    author?: {
        username: string;
        email: string;
    };
}

const formatDate = (timestamp: Timestamp | null | undefined): string => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const PostDetailsPublic = () => {
    const {collection, id} = useParams<{ collection: string; id: string }>();
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!collection || !id) return;

        const fetchPost = async () => {
            try {
                const ref = doc(db, `${collection}_collection`, id);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const postData = snap.data();
                    setPost({
                        id: snap.id,
                        title: postData.title,
                        content: postData.content,
                        thumbnailUrl: postData.thumbnailUrl,
                        createdAt: postData.createdAt,
                        author: postData.author,
                    });
                } else {
                    console.warn('Post not found.');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [collection, id]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    const processContent = (content: string) => {
        return parse(content || '<p>No content available.</p>', {
            replace: (domNode: DOMNode) => {
                if (domNode instanceof Element && domNode.name === 'pre' && domNode.attribs?.class === 'ql-syntax') {
                    const firstChild = domNode.children[0];
                    const code = firstChild && 'data' in firstChild ? firstChild.data : '';
                    return (
                        <Box sx={{position: 'relative', my: 3}}>
                            <Tooltip title="Copy Code">
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        zIndex: 1,
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        '&:hover': {backgroundColor: 'rgba(255,255,255,0.2)'},
                                    }}
                                    onClick={() => handleCopy(code)}
                                >
                                    <ContentCopyIcon fontSize="small" sx={{color: '#fff'}}/>
                                </IconButton>
                            </Tooltip>
                            <SyntaxHighlighter
                                language="javascript"
                                style={vscDarkPlus}
                                customStyle={{
                                    borderRadius: 8,
                                    padding: 16,
                                    margin: 0,
                                    fontSize: '0.9rem',
                                    background: '#1e1e1e',
                                }}
                            >
                                {code}
                            </SyntaxHighlighter>
                        </Box>
                    );
                }
                return domNode;
            },
        });
    };

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 5}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (!post) {
        return (
            <Typography sx={{mt: 5, textAlign: 'center'}}>Post not found.</Typography>
        );
    }

    const authorName = post.author?.username || 'Unknown';
    const authorInitial = authorName[0]?.toUpperCase() || 'U';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                py: 4,
                px: {xs: 2, sm: 4},
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    mx: 'auto',
                    px: {xs: 2, sm: 3, md: 4},
                    maxWidth: {
                        xs: '100%',
                        sm: '600px',
                        md: '960px',
                        lg: '1100px',
                        xl: '1300px',
                    },
                }}
            >
                {post.thumbnailUrl && (
                    <img
                        src={post.thumbnailUrl}
                        alt={post.title}
                        style={{
                            width: '100%',
                            borderRadius: 8,
                            maxHeight: 400,
                            objectFit: 'cover',
                            marginBottom: '30px',
                        }}
                    />
                )}
                <Helmet>
                    <title>{post.title}</title>
                    <meta name="description" content={post.content?.slice(0, 150)}/>
                </Helmet>

                <Typography variant="h3" fontWeight="bold" sx={{mt: 3}}>
                    {post.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} sx={{pt: 2}}>
                    <Avatar sx={{width: 32, height: 32}}>{authorInitial}</Avatar>
                    <Typography fontWeight={500}>{authorName}</Typography>
                    <Typography color="text.secondary" sx={{ml: 'auto'}}>
                        {formatDate(post.createdAt)}
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        mt: 4,
                        fontSize: 18,
                        lineHeight: 1.8,
                        '& img': {maxWidth: '100%', borderRadius: 4, my: 2},
                        '& iframe': {width: '100%', height: 400, my: 2},
                    }}
                >
                    {processContent(post.content || '')}
                </Box>
            </Box>
        </Box>
    );
};

export default PostDetailsPublic;
