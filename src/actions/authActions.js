import axios from 'axios';
import jwtdecode from 'jwt-decode';
import { SET_CURRENT_USER, SET_USER_DATA, USER_FETCH_DATA_SUCCESS, SAVE_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { applicationIsLoading } from './applicationActions';
import {REACT_API_URL} from '../constants/env.js'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export function setUserData(user) {
  return {
    type: SET_USER_DATA,
    user
  }
}

export function userFetchDataSuccess(user) {
  return {
    type: USER_FETCH_DATA_SUCCESS,
    user
  }
}

export function saveHunterAction(user) {
  return {
    type: SAVE_USER,
    user
  }
}

export function setAuthToken(token) {
  return dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenDate');
    localStorage.setItem('accessToken', token);
    localStorage.setItem('accessTokenDate', (new Date()).getTime() );
    cookies.set('lead_tn', token, { path: '/' });
    
    setAuthorizationToken(token);
    dispatch(setCurrentUser(token));
  };
}

export function resetPassword(data) {
  return dispatch => axios.get(REACT_API_URL + `/recover/password?email=${data}`)
    .then(res => {
      return res
    }).catch((err) => {
      return err.response
    });
}

export function updateSalesforceCode(code) {
  return dispatch => axios.post(REACT_API_URL + `/users/salesforce_integration`, {code})
    .then(res => {
      return res
    }).catch((err) => {
      return err.response
    });
}

export function updatePassword(data, id) {
  return dispatch => axios.put(REACT_API_URL + `/recover_passwords/${id}`, data)
    .then(res => {
      return res
    }).catch((err) => {
      return err.response
    });
}

export function googleLogin(google_token) {
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios.post(`${REACT_API_URL}/omniauth/sign_up`, {"omniauth" : google_token})
        .then(res => {
          dispatch(applicationIsLoading(false));
          
          if (res.data.status === 200) { 
            
            const token = res.data.user.token;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenDate');
            localStorage.removeItem('userDetail');
            localStorage.removeItem('firstName');
            localStorage.removeItem('PlanId');
            localStorage.removeItem('PlanName');

            localStorage.setItem('accessToken', token);
            localStorage.setItem('accessTokenDate', (new Date()).getTime());

            localStorage.setItem('userDetail', JSON.stringify(res.data.user));
            localStorage.setItem('firstName', res.data.user.firstname);
            localStorage.setItem('PlanId', res.data.user.plan_id);
            localStorage.setItem('PlanName', res.data.user.plan.name);
            //cookie.set('accessToken', token);
            cookies.set('lead_tn', token, { path: '/' });
        
            dispatch(setCurrentUser(jwtdecode(token)));
            setAuthorizationToken(token);
            
            return res;
          }else{
            return res;  
          }
          
        });
    }
}

export function login(loginData) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/authenticate', loginData)
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) { 
          //console.log('res.data',res.data)
          const token = res.data.token;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('accessTokenDate');
          localStorage.removeItem('userDetail');
          localStorage.removeItem('firstName');
          localStorage.removeItem('PlanId');
          localStorage.removeItem('PlanName');

          localStorage.setItem('accessToken', token);
          localStorage.setItem('accessTokenDate', (new Date()).getTime());

          localStorage.setItem('userDetail', JSON.stringify(res.data));
          localStorage.setItem('firstName', res.data.firstname);
          localStorage.setItem('PlanId', res.data.plan_id);
          localStorage.setItem('PlanName', res.data.plan.name);
          //cookie.set('accessToken', token);
          cookies.set('lead_tn', token, { path: '/' });
          dispatch(setCurrentUser(jwtdecode(token)));
          setAuthorizationToken(token);
          
          return res;
        }
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  } 
}

export function getConfirmation(url) {
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
    .then(user => {
      dispatch(applicationIsLoading(false));
      return user
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function authorizeToken(data) {
  return dispatch => axios.get(REACT_API_URL + `/edit/password?token=${data}`)
    .then(res => {
      return res
    }).catch((err) => {
      return err.response
    });
}

export function users(uuid) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/users/` + uuid
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
    .then(user => {
      dispatch(applicationIsLoading(false));
      dispatch(userFetchDataSuccess(user));
      return user
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function saveHunter(data) {
  let dataSend = {user: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.put(REACT_API_URL + `/users/${data.uuid}`, dataSend)
      .then(res => {
        dispatch(saveHunterAction(res))
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


export function set_session(res) {
  return dispatch => {
    const token = res.data.user.token;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenDate');
    localStorage.removeItem('userDetail');
    localStorage.removeItem('firstName');
    localStorage.removeItem('PlanId');
    localStorage.removeItem('PlanName');

    localStorage.setItem('accessToken', token);
    localStorage.setItem('accessTokenDate', (new Date()).getTime());

    localStorage.setItem('userDetail', JSON.stringify(res.data.user));
    localStorage.setItem('firstName', res.data.user.firstname);
    localStorage.setItem('PlanId', res.data.user.plan_id);
    localStorage.setItem('PlanName', res.data.user.plan.name);

    cookies.set('lead_tn', token, { path: '/' });
    //cookie.set('accessToken', token);
    dispatch(setCurrentUser(jwtdecode(token)));
    setAuthorizationToken(token);

  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenDate');
    localStorage.removeItem('linkedin_cookie')
    localStorage.removeItem('userDetail');
    localStorage.removeItem('firstName');
    localStorage.removeItem('PlanId');
    localStorage.removeItem('PlanName');
    cookies.remove('lead_tn');

    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));

  };
}


export function searchEmail(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/find_email`, data)
      .then(res => {
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

export function inviteUser(data) {
  let dataSend = {emails: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/invitations`, dataSend)
      .then(res => {
        // dispatch(saveHunterAction(res))
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

export function getPlanSuccess(plans) {
  return {
    type: "PLAN_FETCH_DATA_SUCCESS",
    plans
  }
}

export function getPlans(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url
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
    .then(plans => {
      dispatch(getPlanSuccess(plans));
      return plans
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function paymentSent(data) {
  // let dataSend = {emails: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/payment_notifications`, data)
      .then(res => {
        // dispatch(saveHunterAction(res))
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
            localStorage.setItem('PlanId', res.data.plan.id);
            localStorage.setItem('PlanName', res.data.plan.name);

            var userDetail = JSON.parse(localStorage.userDetail)
            userDetail.plan_id = res.data.plan.id
            userDetail.plan = res.data.plan

            localStorage.setItem('userDetail', JSON.stringify(userDetail));

          return res;
        }
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  } 
}

export function subcribtion(data) {
  let dataSend = {email: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/add_subscriber`, dataSend)
      .then(res => {
        // dispatch(saveHunterAction(res))
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