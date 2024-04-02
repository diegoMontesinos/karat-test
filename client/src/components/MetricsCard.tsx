import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useGetMetricsQuery } from '../api';

const MetricsDataItem: React.FC<{
  value: number;
  title: ReactNode;
  isLoading: boolean;
}> = ({ value, title, isLoading }) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    {isLoading ? (
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    ) : (
      <Typography variant="h4">
        $
        {value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Typography>
    )}
    <Typography variant="h6">{title}</Typography>
  </Box>
);

const MetricsCard: React.FC = () => {
  const { data, isLoading } = useGetMetricsQuery();

  return (
    <Card
      elevation={0}
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}
    >
      <CardHeader
        title="Metrics"
        titleTypographyProps={{
          variant: 'subtitle1',
          sx: {
            fontWeight: 600,
            pb: 2,
          },
        }}
      />
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
        }}
      >
        <MetricsDataItem
          value={data ? data.sum : 0}
          title={
            <>
              Sum of
              <br />
              all transactions
            </>
          }
          isLoading={isLoading}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <MetricsDataItem
          value={data ? data.average : 0}
          title={
            <>
              Average of
              <br />
              all transactions
            </>
          }
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
