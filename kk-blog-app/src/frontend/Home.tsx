import {Box, Divider, Typography} from "@mui/material";


const Home: React.FC = () => {

    return (
        <Box sx={{padding: 2}} >
            <Typography variant="h4" gutterBottom sx={{ fontWeight:"520" }} > Latest Buzz</Typography>
            <Typography variant="body1" gutterBottom>Stay updated with the latest thoughts, tutorials, and updates</Typography>
            <Divider sx={{ my: 3, borderBottomWidth: 4 }} />


            <Typography variant="h4" gutterBottom sx={{ fontWeight:"520" }} >💡 Code Stuff</Typography>
            <Typography variant="body1" gutterBottom>Dive into development, tools, game dev, and all things tech — from quick fixes to deep dives.</Typography>
            <Divider sx={{ my: 3, borderBottomWidth: 4 }} />

            <Typography variant="h4" gutterBottom sx={{ fontWeight:"520" }} >🎥 Frame by Frame</Typography>
            <Typography variant="body1" gutterBottom>Exploring storytelling, editing, VFX tricks, and post-production diaries.</Typography>
            <Divider sx={{ my: 3, borderBottomWidth: 4 }} />

            <Typography variant="h4" gutterBottom sx={{ fontWeight:"520" }} >Top Picks</Typography>
            <Typography variant="body1" gutterBottom>Most loved, most read — take a look at the top of the charts</Typography>
            <Divider sx={{ my: 3, borderBottomWidth: 4 }} />
        </Box>
    )

}
export default Home;