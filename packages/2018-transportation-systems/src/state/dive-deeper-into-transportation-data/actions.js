import fetchAdapter from "../fetch-adapter";
import actionEmitter from "../api-adapter-action-emitter";

export const API_START = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/START";
export const API_SUCCESS = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/SUCCESS";
export const API_FAILURE = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/ERROR";
export const COORDS_START = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/COORDS_START";
export const COORDS_SUCCESS =
  "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/COORDS_SUCCESS";
export const COORDS_FAILURE =
  "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/COORDS_ERROR";
export const SET_COORDS = "DIVE_DEEPER_INTO_TRANSPORTATION_DATA/SET_COORDS";

export const diveDeeperIntoTransportationDataStart = actionEmitter(API_START);
export const diveDeeperIntoTransportationDataSuccess = actionEmitter(
  API_SUCCESS
);
export const diveDeeperIntoTransportationDataFailure = actionEmitter(
  API_FAILURE
);
export const diveDeeperIntoTransportationDataCoordsStart = actionEmitter(
  COORDS_START
);
export const diveDeeperIntoTransportationDataCoordsSuccess = actionEmitter(
  COORDS_SUCCESS
);
export const diveDeeperIntoTransportationDataCoordsFailure = actionEmitter(
  COORDS_FAILURE
);
export const diveDeeperIntoTransportationDataSetCoords = actionEmitter(
  SET_COORDS
);

export const fetchDiveDeeperIntoTransportationData = fetchAdapter(
  `sandbox/slides/poi/`,
  {
    start: diveDeeperIntoTransportationDataStart,
    success: diveDeeperIntoTransportationDataSuccess,
    failure: diveDeeperIntoTransportationDataFailure
  }
);

export const fetchDiveDeeperIntoTransportationDataCoords = fetchAdapter(
  `api/DisasterNeighborhoodGrid/`,
  {
    encodeParams: (url, coords) =>
      `${url}?lat=${coords.latitude
        .toPrecision(6)
        .toString()}&long=${coords.longitude.toPrecision(6).toString()}`,
    start: diveDeeperIntoTransportationDataCoordsStart,
    success: diveDeeperIntoTransportationDataCoordsSuccess,
    failure: diveDeeperIntoTransportationDataCoordsFailure
  }
);
