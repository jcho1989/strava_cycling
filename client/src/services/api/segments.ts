import {stravaClient} from "./stravaClient";

export const baseApi = '/segments';

function exploreSegments() {
  return stravaClient.get(`${baseApi}/explore`);
}

function getLoggedInAthleteStarredSegments() {
  return stravaClient.get(`${baseApi}/starred`);
}

function getSegmentById(id: number) {
  return stravaClient.get(`${baseApi}/${id}`);
}

function getSegmentStreams(id: number) {
  return stravaClient.get(`${baseApi}/${id}/streams`);
}

export default {
  exploreSegments,
  getLoggedInAthleteStarredSegments,
  getSegmentById,
  getSegmentStreams
}