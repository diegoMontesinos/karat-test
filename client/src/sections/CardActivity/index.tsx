import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CardActivity: React.FC = () => (
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
      Card Activity
    </Typography>

    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        mt: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          flex: 1,
        }}
      ></Paper>
    </Box>
  </Box>
);

export default CardActivity;
