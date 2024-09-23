"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseApi = void 0;
var stravaClient_1 = require("./stravaClient");
exports.baseApi = '/athlete';
function getLoggedInAthlete() {
    return stravaClient_1.stravaClient.get(exports.baseApi);
}
function getLoggedInAthleteZones() {
    return stravaClient_1.stravaClient.get("".concat(exports.baseApi, "/zones"));
}
function getStats() {
    return stravaClient_1.stravaClient.get("".concat(exports.baseApi, "/stats"));
}
function getLoggedInAthleteActivities() {
    return stravaClient_1.stravaClient.get("".concat(exports.baseApi, "/activities"));
}
exports.default = {
    getLoggedInAthlete: getLoggedInAthlete,
    getLoggedInAthleteZones: getLoggedInAthleteZones,
    getStats: getStats,
    getLoggedInAthleteActivities: getLoggedInAthleteActivities
};
