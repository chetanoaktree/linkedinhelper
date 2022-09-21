import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import {REACT_API_URL} from '../constants/env.js'


export function exportData(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url:  REACT_API_URL + url
    })
    .then((response) => {
      dispatch(applicationIsLoading(false));
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data
        }
      }
    )
    .then(actionData => {
      // dispatch(actionExport(actionData));
      return actionData
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function importData(url, data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + url, data)
      .then(res => {
        // dispatch(saveTemplateAction(res))
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          return res;
        }
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  } 
}
