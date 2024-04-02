import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AnalysisCard from '../components/AnalysisCard';
import CardHistoryCard from '../components/CardHistoryCard';
import MetricsCard from '../components/MetricsCard';

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
    >
      <Grid container columnSpacing={4}>
        <Grid container item xs={6} rowSpacing={4}>
          <Grid item xs={12} display="flex">
            <MetricsCard />
          </Grid>

          <Grid item xs={12} display="flex">
            <AnalysisCard />
          </Grid>
        </Grid>

        <Grid item xs={6} display="flex">
          <CardHistoryCard />
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default Home;
