/* eslint-disable */
import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const diveDeeperIntoTransportationData = createSelector(
  rootState,
  ({ diveDeeperIntoTransportationData }) => diveDeeperIntoTransportationData
);

// export const getTrafficLightDataRequest = createSelector(
//   diveDeeperIntoTransportationData,
//   ({ getTrafficLightData }) => getTrafficLightData
// );

export const getDiveDeeperIntoTransportationData = createSelector(
  diveDeeperIntoTransportationData,
  ({ data }) => data
);

export const isDiveDeeperIntoTransportationDataPending = createSelector(
  diveDeeperIntoTransportationData,
  ({ pending }) => !!pending
);

export const catchDiveDeeperIntoTransportationDataErrors = createSelector(
  diveDeeperIntoTransportationData,
  ({ error }) => error || error
);

export const getTrafficLightData = createSelector(
  diveDeeperIntoTransportationData,
  ({ trafficLightData }) => trafficLightData
);

export const isTrafficLightDataPending = createSelector(
  diveDeeperIntoTransportationData,
  ({ trafficLightPending }) => !!trafficLightPending
);

export const catchTrafficLightDataErrors = createSelector(
  diveDeeperIntoTransportationData,
  ({ trafficLightError }) => trafficLightError || trafficLightError
);
