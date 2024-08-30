import {stravaClient} from "./stravaClient";

export const baseApi = '/activities';

function getActivityById({pathParams: {id}}) {
  return stravaClient.get(`${baseApi}/${id}`);
}

function getCommentsByActivityId(id) {
  return stravaClient.get(`${baseApi}/${id}/comments`);
}

function getKudoersByActivityId(id) {
  return stravaClient.get(`${baseApi}/${id}/kudos`);
}

function getLapsByActivityId(id) {
  return stravaClient.get(`${baseApi}/${id}/laps`);
}

function getLoggedInAthleteActivities() {
  return stravaClient.get(`${baseApi}/activities`);
}

function getZonesByActivityId(id) {
  return stravaClient.get(`${baseApi}/${id}/zones`);
}

export default {
  getActivityById,
  getCommentsByActivityId,
  getKudoersByActivityId,
  getLapsByActivityId,
  getLoggedInAthleteActivities,
  getZonesByActivityId
}