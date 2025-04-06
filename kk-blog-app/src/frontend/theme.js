// theme.ts
import { createTheme } from "@mui/material/styles";
const commonTypography = {
    fontFamily: "'Fira Mono', monospace",
};
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9", // soft blue for dark theme
        },
        background: {
            default: "#121212",
            paper: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#cccccc",
        },
    },
    typography: commonTypography,
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1e1e1e",
                    color: "#ffffff",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#ffffff",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#ffffff",
                },
            },
        },
    },
});
export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2", // strong blue
        },
        background: {
            default: "#f4f6f8", // light gray for better contrast
            paper: "#ffffff",
        },
        text: {
            primary: "#111111",
            secondary: "#555555",
        },
    },
    typography: commonTypography,
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    color: "#111111",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#111111",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#111111",
                },
            },
        },
    },
});
