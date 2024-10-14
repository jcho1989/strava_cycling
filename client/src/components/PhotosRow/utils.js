const PHOTOS_LENGTH_COUNT = 10;

export function collectActivitiesWithPhotos(activities, limit = PHOTOS_LENGTH_COUNT) {
  const activitiesWithPhotos = [];
  let activitiesPhotoCount = 0;
  
  activities.forEach(activity => {
    if (activitiesPhotoCount >= limit) {
      return;
    }
    if (activity.total_photo_count) {
      activitiesWithPhotos.push(activity.id);
      activitiesPhotoCount += activity.total_photo_count;
    }
  })
  return activitiesWithPhotos
}