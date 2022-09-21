import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import { CAMPAIGN_FETCH_DATA_SUCCESS, SELECTED_CAMPAIGN_UPDATED, CAMPAIGN_PLAY_FETCH_DATA_SUCCESS, SELECTED_CAMPAIGN_PLAY_UPDATED, SELECTED_CAMPAIGN_PLAY_EMAIL, CONNECT_CAMPAIGN_PLAY_EMAIL, CONNECTED_FETCH_DATA_SUCCESS, SCRAPING_FETCH_DATA_SUCCESS, MEMBER_FETCH_DATA_SUCCESS, CAMPAIGN_DELETE_SUCCESS, CAMPAIGN_FETCH_SUCCESS } from '../constants/types';
import {REACT_API_URL} from '../constants/env.js'
import { reject } from 'lodash';
// import { env } from '../Constants';


export function campaignFetchDataSuccess(campaigns) {
  return {
    type: CAMPAIGN_FETCH_DATA_SUCCESS,
    campaigns
  }
}

export function selectCampaign(campaigns) {
  return {
    type: SELECTED_CAMPAIGN_UPDATED,
    campaigns
  }
}

export function submitCampaign(data) {
  const campaignData = {
    url: window.location.href,
    campaign_type: 'connect'
  }

 
  var campaign = { "campaign" : data}
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/campaigns', campaign)
      .then(res => {
        dispatch(applicationIsLoading(false));
        return res
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  }
}

export function updateCampaign(data) {
  let dataSend = {campaign: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.put(REACT_API_URL + `/campaigns/${data.id}`, dataSend)
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

export function campaignFetchSuccess(campaign) {
  return {
    type: CAMPAIGN_FETCH_SUCCESS,
    campaign
  }
}

export function fetchCampaign(uuid) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/campaigns/${uuid}`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return response.data;
        } else {
          return response.data
        }
      }
    )
    .then(campaign => {
      dispatch(applicationIsLoading(false));
      dispatch(campaignFetchSuccess(campaign));
      return campaign
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}


export function deleteCampaignAction() {
  return {
    type: CAMPAIGN_DELETE_SUCCESS
  }
}

export function deleteCampaign(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + `/campaigns/${id}`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data.campaigns
        }
      }
    )
    .then(campaigns => {
      dispatch(applicationIsLoading(false));
      dispatch(deleteCampaignAction());
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}


export function applyAction(action, ids) {
  const data = { action_type: action, ids: ids.join(',') }
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    const querystring = require('querystring');
    const url = REACT_API_URL + `/campaign_operation`;
    return axios.get(url, {
      params: data,
      paramsSerializer: params => {
        return querystring.stringify(params)
      }      
    })
    .then((response) => {
      return response
    }).catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function getCampaigns(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
      
    return axios({
      method: "get",
      url,
      headers: {
        Authorization: localStorage.accessToken
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
    .then(response => {
      dispatch(campaignFetchDataSuccess(response.data));
      return response
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function getLogs(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
      
    return axios({
      method: "get",
      url,
      headers: {
        Authorization: localStorage.accessToken
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
    .then(data => {
      // dispatch(campaignFetchDataSuccess(campaigns));
      return data
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}
export function campaignPlayFetchDataSuccess(campaignPlay) {
  return {
    type: CAMPAIGN_PLAY_FETCH_DATA_SUCCESS,
    campaignPlay
  }
}

export function selectCampaignPlay(campaignPlay) {
  return {
    type: SELECTED_CAMPAIGN_PLAY_UPDATED,
    campaignPlay
  }
}

export function selectCampaignPlayEmail(campaignPlay) {
  return {
    type: SELECTED_CAMPAIGN_PLAY_EMAIL,
    campaignPlay
  }
}

export function connectALLFetchDataSuccess(campaignPlay) {
  return {
    type: CONNECT_CAMPAIGN_PLAY_EMAIL,
    campaignPlay
  }
}

export function getCampaignPlay(url) {

  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;

  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url
    })
    .then((response) => {
      dispatch(applicationIsLoading(false));
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return response
        } else {
          return response.data
        }
      }
    )
    .then(campaignPlay => {
      dispatch(campaignPlayFetchDataSuccess(campaignPlay));
      return campaignPlay
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function getCampaignMemberEmails(url, data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(url, data)
      .then(res => {
        // dispatch(memberFetch(res))
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

export function verifyCampaignMemberEmails(member) {
  console.log(member)
  let emails = member.map((val)=>{
    let members = JSON.parse(val.emails);
    return members;  
  });
  let flatEmails = emails.reduce((acc,email)=>{
    return acc.concat(email);
  })
  let emailsToSend = flatEmails.map((val)=>{
    return val.uuid;
  });
  console.log(emailsToSend);
  let data = {
    email_uuids:emailsToSend,
    service:"hunter"
  }
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/verify_emails', data)
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {

          console.log(res);
          return res;
        }
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  }
  
  
}


export function getCampaignPlayEmail(data) {
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

export function getConnectALL(data, url) {
  let dataSend = {'leads': data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(url, dataSend)
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

export function connectedFetch(connected) {
  return {
    type: CONNECTED_FETCH_DATA_SUCCESS,
    connected
  }
}

export function getConnected(url) {
  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;
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
    .then(connected => {
      dispatch(connectedFetch(connected));
      return connected
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function scrapingFetch(scraping) {
  return {
    type: SCRAPING_FETCH_DATA_SUCCESS,
    scraping
  }
}

export function getScraping(url) {
  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;
  return (dispatch) => {
    // dispatch(applicationIsLoading(true));
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
    .then(scraping => {
      dispatch(scrapingFetch(scraping));
      return scraping
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function memberFetch(member) {
  return {
    type: MEMBER_FETCH_DATA_SUCCESS,
    member
  }
}

export function getMember(url) {
  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;
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

export function getCampaignPlaying(url) {
  // console.log("url",url)
  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;
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

export function getRefresh(url) {
  // console.log("url",url)
  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;
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


export function updateAtivity() {
  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios.get(REACT_API_URL + '/update_status')
      .then(res => {
        dispatch(applicationIsLoading(false));
        return res
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  }
}
