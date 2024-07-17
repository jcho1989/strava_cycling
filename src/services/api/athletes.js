import {stravaClient} from "./stravaClient";

function getAuthenticatedAthlete() {
  return stravaClient.get('/athlete');
}

export default {
  getAuthenticatedAthlete
}