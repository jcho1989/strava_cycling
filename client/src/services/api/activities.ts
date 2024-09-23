import {stravaClient} from "./stravaClient";

type PathParams = {
  id: number | undefined
}

interface GetActivityByIdParams {
  pathParams: PathParams;
}

interface GetActivityStreamsParams {
  pathParams: PathParams;
  params?: Record<string, any>; // Optional params for additional query parameters
}


export const baseApi = '/activities';

function getActivityById({pathParams: {id}}: GetActivityByIdParams) {
  if (id === undefined) {
    throw new Error("Activity ID is required");
  }
  return stravaClient.get(`${baseApi}/${id}`);
}

function getCommentsByActivityId(id: number | undefined) {
  if (id === undefined) {
    throw new Error("Activity ID is required");
  }
  return stravaClient.get(`${baseApi}/${id}/comments`);
}

function getKudoersByActivityId(id: number | undefined) {
  if (id === undefined) {
    throw new Error("Activity ID is required");
  }
  return stravaClient.get(`${baseApi}/${id}/kudos`);
}

function getLapsByActivityId(id: number | undefined) {
  if (id === undefined) {
    throw new Error("Activity ID is required");
  }
  return stravaClient.get(`${baseApi}/${id}/laps`);
}

function getZonesByActivityId(id: number | undefined) {
  if (id === undefined) {
    throw new Error("Activity ID is required");
  }
  return stravaClient.get(`${baseApi}/${id}/zones`);
}

function getActivityStreams({pathParams: {id}, params = {}}: GetActivityStreamsParams) {
  if (id === undefined) {
    throw new Error("Activity ID is required");
  }
  return stravaClient.get(`${baseApi}/${id}/streams`, {params});
}


export default {
  getActivityById,
  getCommentsByActivityId,
  getKudoersByActivityId,
  getLapsByActivityId,
  getZonesByActivityId,
  getActivityStreams
}