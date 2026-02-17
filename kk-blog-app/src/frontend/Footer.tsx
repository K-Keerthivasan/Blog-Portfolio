import { Box, Toolbar, Typography, IconButton, useTheme } from "@mui/material";
import CodeOffIcon from '@mui/icons-material/CodeOff';

const Footer = () => {
    const theme = useTheme(); // ✅ Access current theme

    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                mt: "auto",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Toolbar
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "center",
                    gap: { xs: "10px", md: "0" },
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: { xs: "center", md: "left" },
                        fontSize: { xs: "12px", md: "16px" },
                        width: "100%",
                    }}
                >
                    Designed and Developed By KK
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                        alignItems: "center",
                        gap: "5px",
                        width: "100%",
                        maxWidth: "200px",
                    }}
                >
                    <a
                        href="https://dev.kkvasan.ca/"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                    >
                        <IconButton
                            sx={{
                                color: "#b2e1ff",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: "#00c4ff",
                                },
                            }}
                        >
                            <CodeOffIcon />
                        </IconButton>
                    </a>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Footer;
