import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { Card, CardContent, CardHeader } from './shared/Card';

import { formatMoney } from '../utils';

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
      gap: 1,
    }}
  >
    {isLoading ? (
      <Skeleton variant="text" width={210} sx={{ fontSize: '2.125rem' }} />
    ) : (
      <Typography
        variant="h5"
        sx={{ color: value < 0 ? 'error.main' : 'primary.main' }}
      >
        {formatMoney(value)}
      </Typography>
    )}
    <Typography variant="subtitle2">{title}</Typography>
  </Box>
);

const MetricsCard: React.FC<{
  data?: {
    sum: number;
    average: number;
  };
  isLoading: boolean;
}> = ({ data, isLoading }) => (
  <Card elevation={0}>
    <CardHeader title="Metrics" />
    <CardContent>
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

export default MetricsCard;
