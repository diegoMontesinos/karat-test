import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import RecentActivityList from './RecentActivityList';
import RecentActivitySkeleton from './RecentActivitySkeleton';

import { Card, CardContent, CardHeader } from '../../shared/Card';

import { useGetCardActivityQuery } from '../../../api';

const CardActivityCard: React.FC = () => {
  const { data, isLoading } = useGetCardActivityQuery({
    limit: 10,
  });

  return (
    <Card elevation={0}>
      <CardHeader
        title="Recent Activity"
        subheader="Showing last 10 registers"
        action={
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ textDecoration: 'none' }}
            component={Link}
            to="/card-activity"
          >
            See All
          </Typography>
        }
      />

      <CardContent sx={{ pt: 0 }}>
        {isLoading && <RecentActivitySkeleton />}
        {data && <RecentActivityList data={data.data} />}
      </CardContent>
    </Card>
  );
};

export default CardActivityCard;
