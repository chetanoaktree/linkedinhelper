import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import {REACT_API_URL} from '../constants/env.js'

export function register(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/users', { user: data})
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          return res;
        }
      }).catch((err) => {
        return err.response
        dispatch(applicationIsLoading(false));
      });
  }

}

export function registerMember(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/account_members',  data)
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          return res;
        }
      }).catch((err) => {
        return err.response
        dispatch(applicationIsLoading(false));
      });
  }

}

export function contactUs(data) {
  var contact = {contact:  data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/contact_us',  contact)
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          return res;
        }
      }).catch((err) => {
        return err.response
        dispatch(applicationIsLoading(false));
      });
  }

}