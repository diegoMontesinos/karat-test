import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AutoSizer from 'react-virtualized-auto-sizer';

import ActivityList from '../../components/ActivityList';

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
        mt: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          flex: 1,
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <ActivityList width={width} height={height} />
          )}
        </AutoSizer>
      </Paper>
    </Box>
  </Box>
);

export default CardActivity;
