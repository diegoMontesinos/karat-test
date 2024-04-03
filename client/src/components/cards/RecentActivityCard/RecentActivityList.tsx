import List from '@mui/material/List';

import CardActivityListItem from '../../shared/CardActivityListItem';

import { CardActivity } from '../../../types';

const RecentActivityList: React.FC<{ data: CardActivity[] }> = ({ data }) => (
  <List
    disablePadding
    dense
    sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
  >
    {data.map((activity) => (
      <CardActivityListItem
        key={activity.id}
        activity={activity}
        sx={{ flex: 1 }}
      />
    ))}
  </List>
);

export default RecentActivityList;
