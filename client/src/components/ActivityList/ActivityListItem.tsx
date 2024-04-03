import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { CardActivity } from '../../types';

import { formatActivityDate, formatMoney } from '../../utils';

export const ACTIVITY_ITEM_HEIGHT = 72;

export interface ActivityListItemProps {
  activity: CardActivity;
  style: React.CSSProperties;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({
  activity,
  style,
}) => (
  <ListItem
    key={activity.id}
    divider
    style={style}
    secondaryAction={
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1">
          {formatMoney(activity.amount)}
        </Typography>
        <Typography
          variant="caption"
          color={activity.approved ? 'primary' : 'error'}
          sx={{ fontWeight: 600 }}
        >
          {activity.approved ? 'Approved' : 'Declined'}
        </Typography>
      </Box>
    }
  >
    <ListItemIcon>
      {activity.approved ? (
        <CheckCircleIcon fontSize="large" color="primary" />
      ) : (
        <CancelIcon fontSize="large" color="error" />
      )}
    </ListItemIcon>
    <ListItemText
      primary={activity.merchant_data.name}
      primaryTypographyProps={{
        sx: {
          fontWeight: 600,
        },
      }}
      secondary={formatActivityDate(activity.created * 1000)}
    />
  </ListItem>
);

export default ActivityListItem;
