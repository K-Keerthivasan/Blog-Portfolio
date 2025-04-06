import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
const Dashboard = () => {
    return (_jsx(Box, { children: _jsxs(Box, { sx: { mt: 5 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "\uD83D\uDCCA Google Analytics (Realtime)" }), _jsx("iframe", { title: "GA Dashboard", src: "https://lookerstudio.google.com/s/pP3NDsK3uLc", width: "100%", height: "600", style: { border: "none" }, allowFullScreen: true })] }) }));
};
export default Dashboard;
