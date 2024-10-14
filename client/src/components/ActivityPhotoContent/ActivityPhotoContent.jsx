
import PropTypes from 'prop-types';

import {Image, SimpleGrid} from '@mantine/core';

import useActivityPhotos from '../../hooks/services/activities/useActivityPhotos';

import './ActivityPhotoContent.css';


export default function ActivityPhotoContent(props = {}) {
  const {activity} = props;

  const photoIds = [
    12581603110,
    12428897952,
    12419849280,
    12361592411,
    12276531660
  ];

  const {results: photos} = useActivityPhotos(photoIds[4]);

  
  function renderPhotos(photos) {
    if (photos?.length) {

      return photos.map((photo, index) => {
        const photoUrl = Object.values(photo.urls)[0];
      
        return (
          <Image
            className='photo'
            key={index}
            fit='contain'
            radius="md"
            src={photoUrl}
          />
        );
      })
    }
    return null;
  }




  return (
    <div className="ActivityPhotoContent">
      <SimpleGrid cols={2}>
        {renderPhotos(photos)}
      </SimpleGrid>
    </div>
  )
}

ActivityPhotoContent.propTypes = {
  activity: PropTypes.object
}