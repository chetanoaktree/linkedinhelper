import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import { LOGS_FETCH_SUCCESS } from '../constants/types';
import {REACT_API_URL} from '../constants/env.js'

export function logFetch(logData) {
  return {
    type: LOGS_FETCH_SUCCESS,
    logData
  }
}

export function getLogs(url) {
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
          return [];
        } else {
          return response
        }
      }
    )
    .then(logData => {
      dispatch(logFetch(logData));
      return logData
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}