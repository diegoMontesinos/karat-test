import { useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import CardActivityListItem, {
  ACTIVITY_ITEM_HEIGHT,
} from '../shared/CardActivityListItem';

import { useCardActivity } from '../../api';

import { CardActivity } from '../../types';

export interface ActivityListProps {
  width: number;
  height: number;
}

const ActivityList: React.FC<ActivityListProps> = ({ width, height }) => {
  const [activityList, setActivityList] = useState<CardActivity[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data: pages, isValidating, size, setSize } = useCardActivity();

  const onClickSeeMore = () => setSize(size + 1);

  const itemCount = useMemo(
    () =>
      isValidating || hasMore ? activityList.length + 1 : activityList.length,
    [activityList.length, hasMore, isValidating]
  );

  useEffect(() => {
    if (pages && pages.length > 0) {
      const newPage = pages[pages.length - 1];

      setActivityList((prevData) => [...prevData, ...newPage.data]);
      setHasMore(newPage.has_more);
    }
  }, [pages]);

  return (
    <FixedSizeList
      width={width}
      height={height}
      itemCount={itemCount}
      itemSize={ACTIVITY_ITEM_HEIGHT}
      itemData={activityList}
    >
      {({ index, data, style }) => {
        if (index < data.length) {
          const activity = data[index];
          return (
            <CardActivityListItem
              key={activity.id}
              activity={activity}
              style={style}
            />
          );
        }

        return (
          <Box
            style={style}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isValidating && <CircularProgress />}
            {!isValidating && (
              <Button onClick={onClickSeeMore}>See more</Button>
            )}
          </Box>
        );
      }}
    </FixedSizeList>
  );
};

export default ActivityList;
