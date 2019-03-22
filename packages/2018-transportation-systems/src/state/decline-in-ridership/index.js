import apiReducer from '../api-adapter-reducer';
import { API_START, API_SUCCESS, API_ERROR, SET_ROUTE } from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null,
  route: 4,
};

const loadReducers = apiReducer({ INITIAL_STATE, API_START, API_SUCCESS, API_ERROR });

const allReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return {
        ...state,
        route: action.payload.route,
      };
    default:
      return loadReducers(state, action);
  }
};

export default allReducers;
