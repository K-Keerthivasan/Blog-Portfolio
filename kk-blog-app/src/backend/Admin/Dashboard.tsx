import { Box,Typography} from "@mui/material";





const Dashboard: React.FC = () => {


    return (
        <Box>

            <Box sx={{ mt: 5 }}>
                <Typography variant="h6" gutterBottom>
                    📊 Google Analytics (Realtime)
                </Typography>
                <iframe
                    title="GA Dashboard"
                    src="https://lookerstudio.google.com/s/pP3NDsK3uLc"
                    width="100%"
                    height="600"
                    style={{ border: "none" }}
                    allowFullScreen
                />
            </Box>


        </Box>
    )
}

export default  Dashboard;