/* eslint-disable */
import {
  API_START,
  API_SUCCESS,
  API_FAILURE,
  TRAFFIC_LIGHT_API_START,
  TRAFFIC_LIGHT_API_SUCCESS,
  TRAFFIC_LIGHT_API_FAILURE
} from "./actions";

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null,
  trafficLightPending: false,
  trafficLightError: null,
  trafficLightData: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_START:
      return {
        ...state,
        pending: true,
        error: null,
        data: null
      };
    case API_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        data: action.payload
      };
    case API_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
        data: null
      };
    case TRAFFIC_LIGHT_API_START:
      return {
        ...state,
        trafficLightPending: true,
        trafficLightError: null,
        trafficLightData: null
      };
    case TRAFFIC_LIGHT_API_SUCCESS:
      return {
        ...state,
        trafficLightPending: false,
        trafficLightError: null,
        trafficLightData: action.payload
      };
    case TRAFFIC_LIGHT_API_FAILURE:
      return {
        ...state,
        trafficLightPending: false,
        trafficLightError: action.payload,
        trafficLightData: null
      };
    default:
      return state;
  }
};

export default reducer;
