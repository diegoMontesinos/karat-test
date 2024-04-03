import type { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { CardActivity } from '../../../types';

import { formatActivityDate, formatMoney } from '../../../utils';

export const ACTIVITY_ITEM_HEIGHT = 72;

export interface CardActivityListItemProps {
  activity: CardActivity;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
}

const CardActivityListItem: React.FC<CardActivityListItemProps> = ({
  activity: { amount, approved, merchant_data, created },
  style,
  sx,
}) => (
  <ListItem
    style={style}
    sx={sx}
    divider
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
      primaryTypographyProps={{
        sx: {
          fontWeight: 600,
        },
      }}
      secondary={formatActivityDate(created * 1000)}
    />
  </ListItem>
);

export default CardActivityListItem;
