import {useState} from 'react';
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Paper,
} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
 import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import the SVG file (ensure the path is correct)

const CODE_SAMPLE = `const hello = () => {
  console.log("Hello, world!");
};`;

const SVGViewerWithCode = () => {
     const [isCopied, setIsCopied] = useState(false);




    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(CODE_SAMPLE);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    return (
        <Box sx={{p: 4}}>

            {/* Code Block Section */}
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center', mt: 4}}>
                Code Sample (SyntaxHighlighter)
            </Typography>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    position: 'relative',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                }}
            >
                <SyntaxHighlighter
                    language="javascript"
                    style={materialDark}
                    customStyle={{borderRadius: 8, fontSize: 14, padding: 16}}
                >
                    {CODE_SAMPLE}
                </SyntaxHighlighter>
                <Tooltip title={isCopied ? 'Copied!' : 'Copy'} arrow>
                    <IconButton
                        onClick={handleCopyClick}
                        size="small"
                        sx={{position: 'absolute', top: 8, right: 8}}
                    >
                        <ContentCopyIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
            </Paper>
        </Box>
    );
};

export default SVGViewerWithCode;