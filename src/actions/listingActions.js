import { applicationIsLoading } from './applicationActions';
import axios from 'axios';
import {REACT_API_URL} from '../constants/env.js'

export function listingFetchDataSuccess(listing) {
	return {
		type: 'LISTINGS_FETCH_DATA_SUCCESS',
		listing
	}
}

export function listingFetchSuccess(listing) {
  return {
    type: 'LISTINGS_FETCH_SUCCESS',
    listing
  }
}

export function intergrationDataFetchSuccess(payload) {
  return {
    type: 'INTEGRATION_DATA_FETCH_SUCCESS',
    payload
  }
}

export function selectListing(listing) {
  return {
    type: 'SELECT_LISTINGS',
    listing
  }
}

export function saveListingAction(listing) {
  return {
    type: 'SAVE_LISTINGS',
    listing
  }
}

export function deleteListingAction() {
  return {
    type: 'LISTINGS_DELETE_SUCCESS'
  }
}

export function fetchListings(url) {
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
    .then(listing => {
      dispatch(applicationIsLoading(false));
      dispatch(listingFetchDataSuccess(listing));
      return listing
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function getIntegrationMethods() {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/users/email_finder_service`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return {}
        } else {
          return response.data
        }
      }
    )
    .then(data => {
      dispatch(applicationIsLoading(false));
      dispatch(intergrationDataFetchSuccess(data));
      return data
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function fetchListing(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/listings/${id}`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return response.data
        } else {
          return response.data.listing
        }
      }
    )
    .then(listing => {
      dispatch(applicationIsLoading(false));
      dispatch(listingFetchSuccess(listing));
      return listing
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function deleteListing(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + `/listings/${id}`
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
    .then(campaigns => {
      dispatch(applicationIsLoading(false));
      // dispatch(deleteListingAction());
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}




export function saveListing(data) {
  let dataSend = {listing: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/listings', dataSend)
      .then(res => {
        dispatch(saveListingAction(res))
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


export function updateListing(data) {
  let dataSend = {listing: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.put(REACT_API_URL + `/listings/${data.id}`, dataSend)
      .then(res => {
        dispatch(saveListingAction(res))
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


export function memberFetch(member) {
  return {
    type: 'MEMBER_FETCH_DATA_SUCCESS',
    member
  }
}

export function getMember(url) {
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
          // throw Error(response.statusText);
          return response
        } else {
          return response
        }
      }
    )
    .then(member => {
      dispatch(memberFetch(member));
      return member
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function inviteMemberFetch(member) {
  return {
    type: 'INVITE_MEMBER_FETCH_DATA_SUCCESS',
    member
  }
}

export function getInviteMember(url) {
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
          return [];
        } else {
          return response.data
        }
      }
    )
    .then(member => {
      dispatch(inviteMemberFetch(member));
      return member
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function getListingMemberEmails(url, data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(url, data)
      .then(res => {
        // dispatch(memberFetch(res))
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  } 
}

export function getCampaignPlayEmail(data) {
  // let dataSend = {'listing_member_ids': data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/fetch_emails', data)
      .then(res => {
        dispatch(memberFetch(res))
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

export function reSendInvitations(url) {
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
          return [];
        } else {
          return response
        }
      }
    )
    .then(member => {
      return member
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function deleteInvitations(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + `/invitations/${id}`
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
    .then(campaigns => {
      dispatch(applicationIsLoading(false));
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}


export function historyMemberFetch(member) {
  return {
    type: 'HISTORY_MEMBER_FETCH_DATA_SUCCESS',
    member
  }
}

export function getHistoryMember(url) {
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
          return [];
        } else {
          return response.data
        }
      }
    )
    .then(member => {
      dispatch(historyMemberFetch(member));
      return member
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function searchDataFetch(member) {
  return {
    type: 'SEARCH_MEMBER_FETCH_DATA_SUCCESS',
    member
  }
}

export function memberSearch(url){
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: url
    })
    .then(
      response => {
        if(response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data
      }
    )
    .then(searchData => {
      dispatch(applicationIsLoading(false));
      dispatch(searchDataFetch(searchData));
      return searchData
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}
