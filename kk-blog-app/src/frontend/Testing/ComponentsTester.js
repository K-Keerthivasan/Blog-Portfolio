import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Dialog, DialogContent, IconButton, Tooltip, Paper, } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ReactSVGPanZoom, TOOL_PAN } from "react-svg-pan-zoom";
// Import the SVG file
import DiagramSVG from "../../assets/diagram/excalidraw_svg.svg?component";
const CODE_SAMPLE = `const hello = () => {
  console.log("Hello, world!");
};`;
const ComponentsTester = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [panZoomValue, setPanZoomValue] = useState(null);
    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(CODE_SAMPLE);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };
    const handlePreviewClick = () => setIsDialogOpen(true);
    const handleDialogClose = () => setIsDialogOpen(false);
    return (_jsxs(Box, { sx: { p: 4 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { textAlign: "center" }, children: "SVG Diagram Preview (Read-Only)" }), _jsx(Box, { onClick: handlePreviewClick, sx: {
                    mx: "auto",
                    width: "100%",
                    maxWidth: 600,
                    height: 300,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    mb: 4,
                    cursor: "pointer",
                    textAlign: "center",
                }, children: _jsx(Box, { sx: { width: "100%", height: "100%" }, children: _jsx(DiagramSVG, { style: { width: "100%", height: "100%" } }) }) }), _jsx(Dialog, { open: isDialogOpen, onClose: handleDialogClose, fullScreen: true, children: _jsx(DialogContent, { sx: { p: 0 }, children: _jsx(ReactSVGPanZoom, { width: window.innerWidth, height: window.innerHeight, tool: TOOL_PAN, onChangeTool: () => { }, value: panZoomValue, onChangeValue: (value) => setPanZoomValue(value), detectAutoPan: false, background: "#fff", toolbarProps: { position: "top" }, children: _jsx("svg", { width: window.innerWidth, height: window.innerHeight, children: _jsx(DiagramSVG, {}) }) }) }) }), _jsx(Typography, { variant: "h6", gutterBottom: true, sx: { textAlign: "center" }, children: "Code Sample (SyntaxHighlighter)" }), _jsxs(Paper, { elevation: 3, sx: {
                    p: 2,
                    position: "relative",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                }, children: [_jsx(SyntaxHighlighter, { language: "javascript", style: materialDark, customStyle: { borderRadius: 8, fontSize: 14, padding: 16 }, children: CODE_SAMPLE }), _jsx(Tooltip, { title: isCopied ? "Copied!" : "Copy", arrow: true, children: _jsx(IconButton, { onClick: handleCopyClick, size: "small", sx: { position: "absolute", top: 8, right: 8 }, children: _jsx(ContentCopyIcon, { fontSize: "small" }) }) })] })] }));
};
export default ComponentsTester;
