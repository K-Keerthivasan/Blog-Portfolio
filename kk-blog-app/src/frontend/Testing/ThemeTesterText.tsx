import {
    Box,
    Typography,
    Button,
    Link,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
} from "@mui/material";

const ThemeTesterText: React.FC = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                {/* Headings */}
                <Typography variant="h1" gutterBottom>H1 Heading</Typography>
                <Typography variant="h2" gutterBottom>H2 Heading</Typography>
                <Typography variant="h3" gutterBottom>H3 Heading</Typography>
                <Typography variant="h4" gutterBottom>H4 Heading</Typography>
                <Typography variant="h5" gutterBottom>H5 Heading</Typography>
                <Typography variant="h6" gutterBottom>H6 Heading</Typography>

                <Divider sx={{ my: 3 }} />


                {/* Body Text */}
                <Typography variant="body1" gutterBottom>
                    This is body1 text. It’s typically used for longer content paragraphs and normal reading.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    This is body2 text. Slightly smaller and usually used for descriptions or secondary text.
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Button */}
                <Button variant="contained" sx={{ mr: 2 }}>Contained Button</Button>
                <Button variant="outlined" sx={{ mr: 2 }}>Outlined Button</Button>
                <Button variant="text">Text Button</Button>

                <Divider sx={{ my: 3, borderBottomWidth: 4 }} />

                {/* Link */}
                <Typography gutterBottom>
                    Here's a <Link href="#" underline="hover">sample link</Link> inside a paragraph.
                </Typography>

                <Divider sx={{ my: 3, borderBottomWidth: 2 }} />

                {/* Bullet List */}
                <Typography variant="h6" gutterBottom>Bullet List</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="First bullet point" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Second bullet point" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Third bullet point" />
                    </ListItem>
                </List>


                <Typography variant="h6" gutterBottom>
                    Bullet List
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", marginTop: 0 }}>
                    <li>
                        <Typography>First bullet point</Typography>
                    </li>
                    <li>
                        <Typography>Second bullet point</Typography>
                    </li>
                    <li>
                        <Typography>Third bullet point</Typography>
                    </li>
                </ul>

                <Divider sx={{ my: 3 }} />

                {/* Highlighted/Emphasized Text */}
                <Typography>
                    This is <Box component="span" sx={{ backgroundColor: 'primary.main', color: '#fff', px: 1, borderRadius: 1 }}>highlighted text</Box> using the primary theme color.
                </Typography>
            </Paper>
        </Box>
    );
};

export default ThemeTesterText;
