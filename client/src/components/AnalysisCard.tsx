import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { Card, CardContent, CardHeader } from './shared/Card';

import CategoriesChart from './CategoriesChart';

import { formatCategoryName } from '../utils';

const AnalysisCard: React.FC<{
  data?: { categories: Record<string, number> };
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  const chartData = useMemo(
    () =>
      data
        ? Object.keys(data.categories).map((category) => ({
            name: formatCategoryName(category),
            value: data.categories[category],
          }))
        : [],
    [data]
  );

  return (
    <Card elevation={0}>
      <CardHeader title="Analysis" />
      <CardContent>
        {isLoading ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="circular" width={300} height={300} />
          </Box>
        ) : (
          <CategoriesChart data={chartData} />
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;
