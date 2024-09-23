export const STRAVA_BASE_URL = 'https://www.strava.com';

export const PATHS: { [key: string]: string } = {
  AUTH_CALLBACK: '/auth/callback',
  TOKEN: '/token',
  MAIN: '/main',
};

export const STREAM_TYPES = {
  DISTANCE: 'distance',
  TIME: 'time',
  GRADE_SMOOTH: "grade_smooth",
  ALTITUDE: "altitude",
  HEART_RATE: "heartrate",
  GRADE_ADJUSTED_DISTANCE: "grade_adjusted_distance",
} as const;

export const ACTIVITY_TYPES = {
  RUN: 'Run',
  WALK: 'Walk',
  RIDE: 'Ride',
  WEIGHTS: 'WeightTraining'
} as const;

export type DistanceActivityTypes = 
  typeof ACTIVITY_TYPES.RUN | 
  typeof ACTIVITY_TYPES.WALK | 
  typeof ACTIVITY_TYPES.RIDE;


export const DISTANCE_EXERCISES: DistanceActivityTypes[] = [
  ACTIVITY_TYPES.RUN,
  ACTIVITY_TYPES.RIDE,
  ACTIVITY_TYPES.WALK,
];