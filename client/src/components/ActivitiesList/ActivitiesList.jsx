import {useState} from 'react';
import {Collapse, Button, Skeleton, Grid, Space} from '@mantine/core';

import {DISTANCE_EXERCISES} from '../../constants';
import useActivities from '../../hooks/services/activities/useAuthenticatedAthleteActivities';
// import mockActivities from '../mockData/activities.json';

import testData from './testData.json'

import ActivityIntervalContent from '../ActivityIntervalContent/ActivityIntervalContent';
import ActivityPhotoContent from '../ActivityPhotoContent/ActivityPhotoContent';

// grab the first three for now to not risk hitting the API limit
const ACTIVITY_LIST_COUNT = 3;

export default function ActivitiesList() {
  const {results, loading} = useActivities();


  const [opened, setOpened] = useState(Array(testData.length).fill(false));

  function toggle(index) {
    setOpened((prevOpened) => {
      const newOpened = [...prevOpened];
      newOpened[index] = !newOpened[index];
      return newOpened;
    });
  }

  function renderItems(activities) {
    
    // only grab run, ride, or walk activitiesfor now.
    const distanceActivities = activities.filter(activity => DISTANCE_EXERCISES.includes(activity.type));

    return distanceActivities?.map((activity, index) => {
      if (index < ACTIVITY_LIST_COUNT) {
        return (
          <div key={index}>
            <Grid.Col span={24}>

              <Button onClick={() => toggle(index)}>{activity.name}</Button>
              <Collapse in={opened[index]}>
                {opened[index] && (
                  <Space>
                    {/* <ActivityPhotoContent activity={activity}/> */}
                    <ActivityIntervalContent activity={activity}/>
                  </Space>
                )}
              </Collapse>
            </Grid.Col>
          </div>
        );
      }
    });
  }
  
  return (
    <div className='ActivitiesList'>
      <Skeleton height={50} visible={loading}>
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          {results && (
            renderItems(results)
          )}
        </Grid>
      </Skeleton>
    </div>
  );
}