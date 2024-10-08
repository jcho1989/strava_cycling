import {stravaClient} from "./stravaClient";

export const baseApi = '/activities';

function getActivityById({pathParams: {id}}) {
  return stravaClient.get(`${baseApi}/${id}`);
}

function getActivityPhotos({pathParams: {id}}) {
  return stravaClient.get(`${baseApi}/${id}/photos?size=5000`);
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


function getZonesByActivityId(id) {
  return stravaClient.get(`${baseApi}/${id}/zones`);
}

function getActivityStreams({pathParams: {id}, params = {}}) {
  return stravaClient.get(`${baseApi}/${id}/streams`, {params});
}

export default {
  getActivityById,
  getCommentsByActivityId,
  getKudoersByActivityId,
  getLapsByActivityId,
  getZonesByActivityId,
  getActivityStreams,
  getActivityPhotos
}