import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader } from './shared/Card';

import { useGetCardActivityQuery } from '../api';

import { CardActivity } from '../types';

import { formatActivityDate, formatMoney } from '../utils';

const CardActivityFixedList: React.FC<{ data: CardActivity[] }> = ({
  data,
}) => (
  <List
    disablePadding
    dense
    sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
  >
    {data.map(({ id, approved, merchant_data, created, amount }) => (
      <ListItem
        key={id}
        divider
        sx={{ flex: 1 }}
        secondaryAction={
          <Box>
            <Typography>{formatMoney(amount)}</Typography>
          </Box>
        }
      >
        <ListItemIcon>
          {approved ? (
            <CheckCircleIcon color="primary" />
          ) : (
            <CancelIcon color="error" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={merchant_data.name}
          secondary={formatActivityDate(created * 1000)}
        />
      </ListItem>
    ))}
  </List>
);

const CardActivityCard: React.FC = () => {
  const { data } = useGetCardActivityQuery({
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
        {data && <CardActivityFixedList data={data.data} />}
      </CardContent>
    </Card>
  );
};

export default CardActivityCard;
