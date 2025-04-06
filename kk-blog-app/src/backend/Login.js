import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { TextField, Button, Box, Typography, Container, Paper } from "@mui/material";
import { useState } from "react";
import { auth } from "./firebaseConfig.tsx"; // assuming you exported it properly
import { useNavigate } from "react-router-dom";
const adminEmail = "kkvasan99@gmail.com";
import { useTheme } from "@mui/material/styles";
const Login = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user.email !== adminEmail) {
                alert("Unauthorized access");
                await signOut(auth); // Optional: log them out right away
                return;
            }
            alert("Login successful!");
            navigate("/admin"); // ✅ redirect here
        }
        catch (error) {
            alert("Invalid credentials");
            console.error("Login error:", error);
        }
    };
    return (_jsx(Box, { sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "85vh",
            "@media (max-width: 768px)": {
                backgroundSize: "250%", // Scale up the image
                backgroundPosition: "top center", // Adjust position for mobile
            },
        }, children: _jsx(Container, { maxWidth: "xs", sx: {
                backgroundColor: "transparent",
                boxShadow: "none",
                padding: "30px",
            }, children: _jsx(Box, { children: _jsxs(Paper, { elevation: 3, sx: {
                        padding: 4,
                        textAlign: "center",
                        borderRadius: 3,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: "none",
                    }, children: [_jsx(Typography, { variant: "h5", fontWeight: "bold", gutterBottom: true, children: "Login" }), _jsx(TextField, { label: "Email", type: "email", fullWidth: true, margin: "normal", variant: "outlined", value: email, onChange: (e) => setEmail(e.target.value), sx: {
                                marginBottom: "5px",
                            } }), _jsx(TextField, { label: "Password", type: "password", fullWidth: true, margin: "normal", variant: "outlined", value: password, onChange: (e) => setPassword(e.target.value), sx: {
                                marginBottom: "55px",
                            } }), _jsx(Button, { variant: "contained", fullWidth: true, onClick: handleLogin, sx: (theme) => ({
                                background: theme.palette.mode === "dark"
                                    ? "linear-gradient(to right, #00c6ff, #0072ff)"
                                    : "linear-gradient(to right, #1976d2, #64b5f6)",
                                fontWeight: "bold",
                                padding: "10px",
                                borderRadius: "20px",
                                color: theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
                                transition: "background 0.4s ease, transform 0.2s ease",
                                "&:hover": {
                                    background: theme.palette.mode === "dark"
                                        ? "linear-gradient(to right, #0072ff, #00c6ff)"
                                        : "linear-gradient(to right, #64b5f6, #1976d2)",
                                    transform: "scale(1.02)",
                                },
                            }), children: "LOGIN" })] }) }) }) }));
};
export default Login;
