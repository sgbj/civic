/* eslint-disable */
import axios from "axios";

const HOST = "https://opendata.arcgis.com/datasets";
const echo = a => a;

const extApiAdapter = (
  url,
  { encodeParams, start, success, failure }
) => params => dispatch => {
  dispatch(start());

  const encode = encodeParams || echo;
  const fullURL = encode(HOST + url, params);
  return axios
    .get(fullURL)
    .then(res => {
      dispatch(success(res.data));
      return res;
    })
    .catch(err => {
      dispatch(failure(err));
    });
};

export default extApiAdapter;
