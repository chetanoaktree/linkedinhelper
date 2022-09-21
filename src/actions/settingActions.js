import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
// import {REACT_API_URL} from '../constants/env.js'
// var userDetails = (localStorage.userDetail) ? JSON.parse(localStorage.userDetail) : ''


export function actionFetch(actionData) {
  return {
    type: "ACTION_FETCH_SUCCESS",
    actionData
  }
}

export function getActionSetting(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: url,
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
          return response.data.data
        }
      }
    )
    .then(actionData => {
      dispatch(actionFetch(actionData));
      return actionData
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function putActionSetting(data, url) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.put(url, data)
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

export function getResetSetting(url) {
  var data = {}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(url, data)
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