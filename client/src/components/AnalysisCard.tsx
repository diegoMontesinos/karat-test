import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

import { Card, CardContent, CardHeader } from './shared/Card';

const formatCategoryName = (category: string) =>
  category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;
