import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => (
  <Box
    sx={{
      flex: 1,
      pt: 8,
      px: 6,
      pb: 6,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: 600 }}>
      Dashboard
    </Typography>

    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        mt: 4,
      }}
    ></Box>
  </Box>
);

export default Home;
