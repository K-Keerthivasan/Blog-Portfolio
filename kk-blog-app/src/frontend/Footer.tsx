import {AppBar, Toolbar, Typography, IconButton,Box} from "@mui/material";
import CodeOffIcon from '@mui/icons-material/CodeOff';


const Footer = () => {
    return (

        <AppBar position="relative" color="primary"
                component="footer"
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    padding: 0,
                    borderRadius: 0,
                    width: '100%',
                }}>
            <Toolbar
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between", // Ensures proper spacing in desktop
                    textAlign: "center",
                    gap: { xs: "10px", md: "0" }, // Adds spacing in mobile
                }}
            >
                <Typography variant="h6"
                            sx={{
                                textAlign: { xs: "center", md: "left" },
                                fontSize: { xs: "12px", md: "16px" },
                                width: "100%",
                            }}
                >

                    Designed and Developed By KK

                </Typography>


                {/* Right Section */}
                <Box sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-end" },  // Aligns icons to the right
                    alignItems: "center",
                    gap: "5px",
                    width: "100%", // Ensures alignment works
                    maxWidth: "200px", // Prevents excessive spacing on large screens

                }}>
                    {/* Portfolio Link */}
                    <a
                        href="https://kk-dev-portfolio.web.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
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
        </AppBar>

    );
};

export default Footer;
