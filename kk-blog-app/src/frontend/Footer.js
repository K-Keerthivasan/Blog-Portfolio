import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Toolbar, Typography, IconButton, useTheme } from "@mui/material";
import CodeOffIcon from '@mui/icons-material/CodeOff';
const Footer = () => {
    const theme = useTheme(); // ✅ Access current theme
    return (_jsx(Box, { component: "footer", sx: {
            width: "100%",
            mt: "auto",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
        }, children: _jsxs(Toolbar, { sx: {
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                gap: { xs: "10px", md: "0" },
            }, children: [_jsx(Typography, { variant: "h6", sx: {
                        textAlign: { xs: "center", md: "left" },
                        fontSize: { xs: "12px", md: "16px" },
                        width: "100%",
                    }, children: "Designed and Developed By KK" }), _jsx(Box, { sx: {
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                        alignItems: "center",
                        gap: "5px",
                        width: "100%",
                        maxWidth: "200px",
                    }, children: _jsx("a", { href: "https://kk-dev-portfolio.web.app/", target: "_blank", rel: "noopener noreferrer", style: { textDecoration: "none" }, children: _jsx(IconButton, { sx: {
                                color: "#b2e1ff",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: "#00c4ff",
                                },
                            }, children: _jsx(CodeOffIcon, {}) }) }) })] }) }));
};
export default Footer;
