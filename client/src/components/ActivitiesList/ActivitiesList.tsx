import {useState} from 'react';
import {Collapse, Button, Skeleton, Grid} from '@mantine/core';

import {DISTANCE_EXERCISES, DistanceActivityTypes} from '../../constants';
// import mockActivities from '../mockData/activities.json';

// import testData from './testData.json'

import ActivityIntervalContent from '../ActivityDetailPanelContent/ActivityDetailPanelContent';
import useAuthenticatedAthleteActivities from '../../hooks/services/activities/useAuthenticatedAthleteActivities';
import { Activity } from '../../types/Activity.types';

// grab the first three for now to not risk hitting the API limit
const ACTIVITY_LIST_COUNT = 3;

export default function ActivitiesList() {
  const {results, loading} = useAuthenticatedAthleteActivities();

  // const loading = false;
  // const results = mockActivities


  const [opened, setOpened] = useState(Array(testData.length).fill(false));

  function toggle(index: number) {
    setOpened((prevOpened) => {
      const newOpened = [...prevOpened];
      newOpened[index] = !newOpened[index];
      return newOpened;
    });
  }

  function renderItems(activities: Activity[]) {
    
    // only grab run, ride, or walk activitiesfor now.
    const distanceActivities: Activity[] = activities.filter(
      (activity: Activity) => DISTANCE_EXERCISES.includes(activity.type as DistanceActivityTypes)
    );
    

    return distanceActivities?.map((activity: Activity, index: number) => {
      if (index < ACTIVITY_LIST_COUNT) {
        return (
          <div key={index}>
            <Grid.Col span={24}>

              <Button onClick={() => toggle(index)}>{activity.name}</Button>
              <Collapse in={opened[index]}>
                {opened[index] && (
                  <ActivityIntervalContent
                    activity={activity}

                  />
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