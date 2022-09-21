import { applicationIsLoading } from './applicationActions';
import axios from 'axios';
import {REACT_API_URL} from '../constants/env.js'

export function blacklistFetchDataSuccess(blacklist) {
	return {
		type: 'BLACKLIST_FETCH_DATA_SUCCESS',
		blacklist
	}
}

export function blacklistFetchSuccess(blacklist) {
  return {
    type: 'BLACKLIST_FETCH_SUCCESS',
    blacklist
  }
}

export function selectBlacklist(blacklist) {
  return {
    type: 'SELECT_BLACKLIST',
    blacklist
  }
}

export function saveBlacklistAction(blacklist) {
  return {
    type: 'SAVE_BLACKLIST',
    blacklist
  }
}

export function deleteBlacklistAction() {
  return {
    type: 'BLACKLIST_DELETE_SUCCESS'
  }
}

export function fetchBlacklists(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: url
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data
        }
      }
    )
    .then(blacklist => {
      dispatch(applicationIsLoading(false));
      dispatch(blacklistFetchDataSuccess(blacklist));
      return blacklist
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function fetchBlacklist(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/blacklist_members/${id}`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data.blacklist
        }
      }
    )
    .then(blacklist => {
      dispatch(applicationIsLoading(false));
      dispatch(blacklistFetchSuccess(blacklist));
      return blacklist
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function deleteBlacklist(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + `/blacklist_members/${id}`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data.blacklist
        }
      }
    )
    .then(campaigns => {
      dispatch(applicationIsLoading(false));
      // dispatch(deleteBlacklistAction());
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}




export function saveBlacklist(data) {
  let dataSend = {blacklist_member: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/blacklist_members', dataSend)
      .then(res => {
        dispatch(saveBlacklistAction(res))
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


export function updateBlacklist(data) {
  let dataSend = {blacklist: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.put(REACT_API_URL + `/blacklist_members/${data.id}`, dataSend)
      .then(res => {
        dispatch(saveBlacklistAction(res))
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



