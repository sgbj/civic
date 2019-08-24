import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import airtableTestData from "./airtable-test/api";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ...airtableTestData.reducers,
    ...asyncReducers
  });
}
