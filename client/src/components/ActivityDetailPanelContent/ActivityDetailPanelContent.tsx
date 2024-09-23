import {useMemo, useState} from 'react';
import dayjs from 'dayjs';

import {NumberInput, Space, Stack, Text} from '@mantine/core';

import useActivity from '../../hooks/services/activities/useActivity';
import useActivityStreams from '../../hooks/services/activities/useActivityStreams';
import {STREAM_TYPES} from '../../constants';
import {Activity, Stream} from '../../types/Activity.types';

const DEFAULT_INTERVAL = 5;
const DATE_FORMAT = 'MM-DD-YYYY';

export default function ActivityIntervalContent(activity: Activity) {

  const {results: details} = useActivity(activity.id);
  const {results: streams} = useActivityStreams(activity.id);
  
  const formattedDate = useMemo(() => {
    return dayjs(details?.start_date).format(DATE_FORMAT);
  }, [details])
  
  const [intervalNum, setIntervalNum] = useState(DEFAULT_INTERVAL);

  const distanceStream = streams?.find((stream: Stream) => stream.type === STREAM_TYPES.DISTANCE) || [];
  const timeStream = streams?.find((stream: Stream) => stream.type === STREAM_TYPES.TIME) || [];

  function convertMetersToMiles(meters: number) {
    const metersToMilesConversion = 1609.34;
    return Math.floor(meters/metersToMilesConversion * 100) / 100;
  }

  function viewSplitsByMin(timeStream: number[], distanceStream: number[], interval: number) {
    const result = [];
    const minuteMap = new Map();
  
    for (let i = 0; i < timeStream.length; i++) {
      const timeInSeconds = timeStream[i];
      const minute = Math.floor(timeInSeconds / 60);
      
      if (
        minute >= interval &&
        minute % interval === 0 && // check interval
        !minuteMap.has(minute)  // skip if minute has been added
      ) {
          const distance = convertMetersToMiles(distanceStream[i]);
          result.push({minute, distance});
          minuteMap.set(minute, true);
      }
    }
  
    return result;
  }
  function renderSplitsByMin(timeStream: Stream, distanceStream: Stream, interval: number) {
    const splits = viewSplitsByMin(timeStream.data, distanceStream.data, interval);
    return splits.map((split, index) => {
      return <div style={{paddingBottom: 8}} key={index}>
          <Text ta="left">Minute: {split.minute}</Text>
          <Text ta="left">Distance: {split.distance} miles</Text>
      </div>
    });
  }

  return (
    <div className="ActivityIntervalContent">      
      <Space style={{marginTop: 24}}>
        <Text ta="left">Date: {formattedDate}</Text>
        <Text ta="left">Activity: {activity.type}</Text>
        <Text ta="left">Distance: {convertMetersToMiles(activity.distance)}</Text>
        <br/>
        <NumberInput
          defaultValue={DEFAULT_INTERVAL}
          onChange={(value) => setIntervalNum(Number(value))}
          allowDecimal={false}
          min={1}
          label="Minute interval"
          description="View distance by minute"
          />
        <br/>
        {details && streams && (
          <Stack>
            {renderSplitsByMin(timeStream, distanceStream, intervalNum)}
          </Stack>
        )}
      </Space>
    </div>
  )
}