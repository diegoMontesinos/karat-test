import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AnalysisCard from '../../components/cards/AnalysisCard';
import MetricsCard from '../../components/cards/MetricsCard';
import RecentActivityCard from '../../components/cards/RecentActivityCard';

import { useTransactionsDetails } from '../../api';

const Home: React.FC = () => {
  const { data, isLoading } = useTransactionsDetails();

  return (
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
              <MetricsCard data={data} isLoading={isLoading} />
            </Grid>

            <Grid item xs={12} display="flex">
              <AnalysisCard data={data} isLoading={isLoading} />
            </Grid>
          </Grid>

          <Grid item xs={6} display="flex">
            <RecentActivityCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
