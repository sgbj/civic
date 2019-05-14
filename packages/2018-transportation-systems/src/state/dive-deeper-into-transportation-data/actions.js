import apiAdapter from "../api-adapter";
import actionEmitter from "../api-adapter-action-emitter";

export const API_START = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/START";
export const API_SUCCESS = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/SUCCESS";
export const API_ERROR = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/ERROR";

export const diveDeeperIntoTransportationDataStart = actionEmitter(API_START);
export const diveDeeperIntoTransportationDataSuccess = actionEmitter(
  API_SUCCESS
);
export const diveDeeperIntoTransportationDataError = actionEmitter(API_ERROR);

const DIVE_DEEPER_INTO_TRANSPORTATION_DATA_API =
  "https://service.civicpdx.org/transportation-systems/passenger-census/system/annual/averages/?format=json";

export const fetchDiveDeeperIntoTransportationData = apiAdapter(
  DIVE_DEEPER_INTO_TRANSPORTATION_DATA_API,
  {
    start: diveDeeperIntoTransportationDataStart,
    success: diveDeeperIntoTransportationDataSuccess,
    error: diveDeeperIntoTransportationDataError
  }
);
