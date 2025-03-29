import {
    Box,
    Typography,
    Dialog,
    IconButton,
    Tooltip,
    Paper,
    DialogContent,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { Tldraw, createTLStore } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const codeSample = `const hello = () => {
  console.log("Hello, world!");
};`;

const ComponentsTester: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const previewStore = createTLStore();
    const fullScreenStore = createTLStore();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(codeSample);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Box sx={{ p: 4,  }}>
            <Typography variant="h6" gutterBottom>
                TLDraw Preview (Read-Only)
            </Typography>

            {/* 💡 TLDraw Centered Read-Only Preview */}
            <Box
                onClick={() => setOpen(true)}
                sx={{
                    mx: "auto",
                    width: "100%",
                    maxWidth: 600,
                    height: 300,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    mb: 4,
                    cursor: "pointer",
                    textAlign: "center"
                }}
            >
                <Tldraw
                    store={previewStore}
                    onMount={(editor) => {
                        // Disable interactions (tools, editing)
                        editor.setCurrentTool('select');
                        editor.updateInstanceState({ isReadonly: true });
                    }}
                />            </Box>

            {/* 🖼️ Fullscreen Editable TLDraw Canvas */}
            <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
                <DialogContent sx={{ p: 0 }}>
                    <Tldraw store={fullScreenStore} />
                </DialogContent>
            </Dialog>

            {/* Code Box with Copy */}
            <Typography variant="h6" gutterBottom>
                Code Sample
            </Typography>
            <Paper
                elevation={3}
                sx={{ p: 2, position: "relative", bgcolor: "background.paper" }}
            >
                <Typography
                    component="pre"
                    sx={{
                        fontFamily: "'Fira Mono', monospace",
                        whiteSpace: "pre-wrap",
                        fontSize: 14,
                    }}
                >
                    {codeSample}
                </Typography>
                <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
                    <IconButton
                        onClick={handleCopy}
                        size="small"
                        sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Paper>
        </Box>
    );
};

export default ComponentsTester;
