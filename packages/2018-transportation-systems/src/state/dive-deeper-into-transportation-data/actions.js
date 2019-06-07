/* eslint-disable */
import fetchAdapter from "../fetch-adapter";
import extfetchAdapter from "../external-fetch-adapter";
import actionEmitter from "../api-adapter-action-emitter";

// Types
export const API_START = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/START";
export const API_SUCCESS = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/SUCCESS";
export const API_FAILURE = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/ERROR";

export const TRAFFIC_LIGHT_API_START = "TRAFFIC_LIGHT_DATA/START";
export const TRAFFIC_LIGHT_API_SUCCESS = "TRAFFIC_LIGHT_DATA/SUCCESS";
export const TRAFFIC_LIGHT_API_FAILURE = "TRAFFIC_LIGHT_DATA/ERROR";

// Simple actions
export const diveDeeperIntoTransportationDataStart = actionEmitter(API_START);
export const diveDeeperIntoTransportationDataSuccess = actionEmitter(
  API_SUCCESS
);
export const diveDeeperIntoTransportationDataFailure = actionEmitter(
  API_FAILURE
);

export const trafficLightDataStart = actionEmitter(TRAFFIC_LIGHT_API_START);
export const trafficLightDataSuccess = actionEmitter(TRAFFIC_LIGHT_API_SUCCESS);
export const trafficLightDataFailure = actionEmitter(TRAFFIC_LIGHT_API_FAILURE);

// Thunk actions
export const fetchDiveDeeperIntoTransportationData = fetchAdapter(
  `trimet-stop-events/disturbance-stops/`,
  {
    start: diveDeeperIntoTransportationDataStart,
    success: diveDeeperIntoTransportationDataSuccess,
    failure: diveDeeperIntoTransportationDataFailure
  }
);

export const fetchTrafficLightData = extfetchAdapter(
  `9b5ca8086260421d97b427fbd2307d26_54.geojson`,
  {
    start: trafficLightDataStart,
    success: trafficLightDataSuccess,
    failure: trafficLightDataFailure
  }
);
