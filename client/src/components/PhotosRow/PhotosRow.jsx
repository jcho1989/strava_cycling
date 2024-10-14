import { useMemo, useState } from 'react';
import PropTypes from "prop-types";

import { Collapse, Button, Skeleton, Grid, Space, Image } from '@mantine/core';
import mockActivities from '../AuthorizedApp/mockActivities.json';
import photosCollection from '../../mockData/photosCollection.json'

import { collectActivitiesWithPhotos } from './utils';

import ActivityIntervalContent from '../ActivityIntervalContent/ActivityIntervalContent';
import ActivityPhotoContent from '../ActivityPhotoContent/ActivityPhotoContent';

import useMultipleActivityPhotos from '../../hooks/services/activities/useMultipleActivityPhotos';
import activitiesApi from '../../services/api/activities';


export default function PhotosRow(props = {}) {
  // const {activities} = props;
  // const activityIds = collectActivitiesWithPhotos(activities);
  // const res = useMultipleActivityPhotos(activityIds);

  // const activityPromises = activityIds.map(id => id && activitiesApi.getActivityPhotos({pathParams: {id}}))

  // const memoizedPhotos = useMemo(() => {
  //   return Promise.all(activityPromises).then(res => console.log('res', res), err => console.error('err', err));
  // }, [activityPromises]);

  

  
  function renderItems(activities) {
    const images = [];
    return (
    <Grid style={{marginTop: '24px'}}>
      {/* First Row */}
      {images.slice(0, 5).map((src, index) => (
        <Grid.Col key={index} span={2}>
          <Image src={src} alt={`Image ${index + 1}`} />
        </Grid.Col>
      ))}

      {/* Second Row */}
      {images.slice(5, 10).map((src, index) => (
        <Grid.Col key={index + 5} span={2}>
          <Image src={src} alt={`Image ${index + 6}`} />
        </Grid.Col>
      ))}
    </Grid>
  );

  }
  
  return (
    <div className='ActivitiesList'>
      <Skeleton height={50}>
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <p>photos</p>
        </Grid>
      </Skeleton>
    </div>
  );
}

PhotosRow.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object),
};
