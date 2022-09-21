import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import { setUserData } from './authActions';
import {REACT_API_URL} from '../constants/env.js'

export function fetchCurrentUser(){
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/users/get_current_user`,
      headers: {
        Authorization: localStorage.accessToken,
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if(response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data.user
      }
    )
    .then(userDetails => {
      // dispatch(setCurrentUser(userDetails))
      // dispatch(applicationIsLoading(false));
      dispatch(setUserData(userDetails))
      return userDetails
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}
