import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">{formatMoney(amount)}</Typography>
            <Typography
              variant="caption"
              color={approved ? 'primary' : 'error'}
              sx={{ fontWeight: 600 }}
            >
              {approved ? 'Approved' : 'Declined'}
            </Typography>
          </Box>
        }
      >
        <ListItemIcon>
          {approved ? (
            <CheckCircleIcon fontSize="large" color="primary" />
          ) : (
            <CancelIcon fontSize="large" color="error" />
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

export default CardActivityFixedList;
