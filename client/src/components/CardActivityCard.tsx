import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import CardActivityFixedList from './CardActivityFixedList';
import CardActivitySkeletonList from './CardActivitySkeletonList';

import { Card, CardContent, CardHeader } from './shared/Card';

import { useGetCardActivityQuery } from '../api';

const CardActivityCard: React.FC = () => {
  const { data, isLoading } = useGetCardActivityQuery({
    limit: 10,
  });

  return (
    <Card elevation={0}>
      <CardHeader
        title="Card Activity"
        subheader="Showing last 10 registers"
        action={
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ textDecoration: 'none' }}
            component={Link}
            to="/card-activity"
          >
            See more
          </Typography>
        }
      />

      <CardContent sx={{ pt: 0 }}>
        {isLoading && <CardActivitySkeletonList />}
        {data && <CardActivityFixedList data={data.data} />}
      </CardContent>
    </Card>
  );
};

export default CardActivityCard;
