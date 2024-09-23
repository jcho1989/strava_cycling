import {stravaClient} from "./stravaClient";

export const baseApi = '/routes';

function getRouteById(id: number) {
  return stravaClient.get(`${baseApi}/${id}`);
}

function getRoutesByAthleteId(id: number) {
  return stravaClient.get(`athletes/${id}/routes`);
}

export default {
  getRouteById,
  getRoutesByAthleteId,
}