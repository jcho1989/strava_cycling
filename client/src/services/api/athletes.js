import {stravaClient} from "./stravaClient";

export const baseApi = '/athlete';

function getLoggedInAthlete() {
  return stravaClient.get(baseApi);
}

function getLoggedInAthleteZones() {
  return stravaClient.get(`${baseApi}/zones`);
}

function getStats() {
  return stravaClient.get(`${baseApi}/stats`);
}

function getLoggedInAthleteActivities() {
  return stravaClient.get(`${baseApi}/activities`);
}

export default {
  getLoggedInAthlete,
  getLoggedInAthleteZones,
  getStats,
  getLoggedInAthleteActivities
}