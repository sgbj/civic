// A redux action utility for making a thunk based on an api
// ex. const exampleAPI = apiAdapter('service.civicpdx.org/example/api/', { start, success });
//     dispatch(exampleAPI())
import axios from 'axios';
import qs from 'query-string';

const apiAdapter = (url, { start, success, error, buildParams }) => () => (dispatch, getState) => {
  buildParams = buildParams || ( () => {} );
  dispatch(start());
  return axios
    .get(`${url}?${qs.stringify(buildParams(getState()))}`)
    .then(res => {
      dispatch(success(res));
    })
    .catch(err => {
      dispatch(error(err));
    });
};

export default apiAdapter;
