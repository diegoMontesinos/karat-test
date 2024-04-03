import { useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import ActivityListItem, { ACTIVITY_ITEM_HEIGHT } from './ActivityListItem';

import { useLazyGetCardActivityQuery } from '../../api';

import { CardActivity } from '../../types';

export interface ActivityListProps {
  width: number;
  height: number;
}

const PAGE_SIZE = 100;

const ActivityList: React.FC<ActivityListProps> = ({ width, height }) => {
  const [activityList, setActivityList] = useState<CardActivity[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [startingAfter, setStartingAfter] = useState<string | undefined>(
    undefined
  );

  const [trigger, { data: response, isFetching }] =
    useLazyGetCardActivityQuery();

  const loadMore = () => {
    trigger({
      limit: PAGE_SIZE,
      starting_after: startingAfter,
    });
  };

  const itemCount = useMemo(
    () =>
      isFetching || hasMore ? activityList.length + 1 : activityList.length,
    [activityList.length, hasMore, isFetching]
  );

  useEffect(() => {
    trigger({
      limit: PAGE_SIZE,
    });
  }, [trigger]);

  useEffect(() => {
    if (response && !isFetching) {
      const data = response.data;

      setActivityList((prevData) => [...prevData, ...data]);
      setHasMore(response.has_more);
      setStartingAfter(data[data.length - 1].id);
    }
  }, [isFetching, response]);

  return (
    <FixedSizeList
      width={width}
      height={height}
      itemCount={itemCount}
      itemSize={ACTIVITY_ITEM_HEIGHT}
      itemData={activityList}
    >
      {({ index, data, style }) => {
        if (index < data.length)
          return <ActivityListItem activity={data[index]} style={style} />;

        return (
          <Box
            style={style}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isFetching && <CircularProgress />}
            {!isFetching && <Button onClick={loadMore}>See more</Button>}
          </Box>
        );
      }}
    </FixedSizeList>
  );
};

export default ActivityList;
