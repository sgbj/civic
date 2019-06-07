/* eslint-disable */
import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getDiveDeeperIntoTransportationDataRequest = createSelector(
  rootState,
  ({ diveDeeperIntoTransportationData }) => diveDeeperIntoTransportationData
);

export const getTrafficLightDataRequest = createSelector(
  rootState,
  ({ getTrafficLightData }) => getTrafficLightData
);

export const getDiveDeeperIntoTransportationData = createSelector(
  getDiveDeeperIntoTransportationDataRequest,
  ({ data }) => data
);

export const isDiveDeeperIntoTransportationDataPending = createSelector(
  getDiveDeeperIntoTransportationDataRequest,
  ({ pending }) => !!pending
);

export const catchDiveDeeperIntoTransportationDataErrors = createSelector(
  getDiveDeeperIntoTransportationDataRequest,
  ({ error }) => error || error
);

export const getTrafficLightData = createSelector(
  getTrafficLightDataRequest,
  ({ lightData }) => lightData
);

export const isTrafficLightDataPending = createSelector(
  getTrafficLightDataRequest,
  ({ lightPending }) => !!lightPending
);

export const catchTrafficLightDataErrors = createSelector(
  getTrafficLightDataRequest,
  ({ lightError }) => lightError || lightError
);
