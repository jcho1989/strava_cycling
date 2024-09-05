export const STRAVA_BASE_URL = 'https://www.strava.com';

export const PATHS = {
  AUTH_CALLBACK: '/auth/callback',
  TOKEN: '/token',
  MAIN: '/main'
}

export const STREAM_TYPES = {
  DISTANCE: 'distance',
  TIME: 'time',
  GRADE_SMOOTH: "grade_smooth",
  ALTITUDE: "altitude",
  HEART_RATE: "heartrate",
  GRADE_ADJUSTED_DISTANCE: "grade_adjusted_distance",
};

export const ACTIVITY_TYPES = {
  RUN: 'Run',
  WALK: 'Walk',
  RIDE: 'Ride',
  WEIGHTS: '"WeightTraining"'
};

export const DISTANCE_EXERCISES = [
  ACTIVITY_TYPES.RUN,
  ACTIVITY_TYPES.RIDE,
  ACTIVITY_TYPES.WALK,
]