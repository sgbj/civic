import fetchAdapter from "../fetch-adapter";
import actionEmitter from "../api-adapter-action-emitter";

export const API_START = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/START";
export const API_SUCCESS = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/SUCCESS";
export const API_FAILURE = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/ERROR";

export const diveDeeperIntoTransportationDataStart = actionEmitter(API_START);
export const diveDeeperIntoTransportationDataSuccess = actionEmitter(
  API_SUCCESS
);
export const diveDeeperIntoTransportationDataFailure = actionEmitter(
  API_FAILURE
);

export const fetchDiveDeeperIntoTransportationData = fetchAdapter(
  `trimet-stop-events/disturbance-stops/`,
  {
    start: diveDeeperIntoTransportationDataStart,
    success: diveDeeperIntoTransportationDataSuccess,
    failure: diveDeeperIntoTransportationDataFailure
  }
);
