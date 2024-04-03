import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

const RecentActivitySkeleton: React.FC = () => (
  <List
    disablePadding
    dense
    sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
  >
    {Array(10)
      .fill(0)
      .map((_, idx) => (
        <ListItem
          key={`skeleton-item-${idx}`}
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
              <Skeleton
                variant="text"
                width={120}
                sx={{ fontSize: '0.875rem' }}
              />
              <Skeleton
                variant="text"
                width={120}
                sx={{ fontSize: '0.875rem' }}
              />
            </Box>
          }
        >
          <ListItemIcon>
            <Skeleton variant="circular" width={35} height={35} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Skeleton
                variant="text"
                width={120}
                sx={{ fontSize: '0.875rem' }}
              />
            }
            secondary={
              <Skeleton
                variant="text"
                width={120}
                sx={{ fontSize: '0.875rem' }}
              />
            }
          />
        </ListItem>
      ))}
  </List>
);

export default RecentActivitySkeleton;
