import {stravaClient} from "./stravaClient";

export const baseApi = '/routes';

function getRouteById(id) {
  return stravaClient.get(`${baseApi}/${id}`);
}

function getRoutesByAthleteId(id) {
  return stravaClient.get(`athletes/${id}/routes`);
}

export default {
  getRouteById,
  getRoutesByAthleteId,
}