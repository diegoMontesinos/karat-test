import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import RecentActivityList from './RecentActivityList';
import RecentActivitySkeleton from './RecentActivitySkeleton';

import { Card, CardContent, CardHeader } from '../../shared/Card';

import { useCardActivity } from '../../../api';

const RecentActivityCard: React.FC = () => {
  const { data: pages, isValidating } = useCardActivity();

  return (
    <Card elevation={0} aria-label="recent-activity-card">
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
        {isValidating && <RecentActivitySkeleton />}
        {pages && pages.length > 0 && (
          <RecentActivityList data={pages[0].data} />
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
