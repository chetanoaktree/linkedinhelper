import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import { DASHBOARD_FETCH_DATA_SUCCESS } from '../constants/types';

export function dashboardFetch(getData) {
  return {
    type: DASHBOARD_FETCH_DATA_SUCCESS,
    getData
  }
}

export function getDashboard(url) {
  // axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url,
      headers: {
         "Accept":  'application/json'
      }
    })
    .then((response) => {
      dispatch(applicationIsLoading(false));
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return {};
        } else {
          return response
        }
      }
    )
    .then(getData => {
      dispatch(dashboardFetch(getData));
      return getData
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return {}
    })
  }
}