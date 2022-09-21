import { applicationIsLoading } from './applicationActions';
import axios from 'axios';
import {REACT_API_URL} from '../constants/env.js'

export function templatesFetchDataSuccess(templates) {
	return {
		type: 'TEMPLATE_FETCH_DATA_SUCCESS',
		templates
	}
}

export function templatesFetchSuccess(template) {
  return {
    type: 'TEMPLATE_FETCH_SUCCESS',
    template
  }
}

export function selectTemplate(template) {
  return {
    type: 'SELECT_TEMPLATE',
    template
  }
}


export function saveTemplateAction(template) {
  return {
    type: 'SAVE_TEMPLATE',
    template
  }
}


export function deleteTemplateAction() {
  return {
    type: 'TEMPLATE_DELETE_SUCCESS'
  }
}




export function fetchTemplates(url) {
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
    .then(campaigns => {
      dispatch(applicationIsLoading(false));
      dispatch(templatesFetchDataSuccess(campaigns));
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function fetchTemplate(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/templates/${id}`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return response.data
        } else {
          return response.data.template
        }
      }
    )
    .then(template => {
      dispatch(applicationIsLoading(false));
      dispatch(templatesFetchSuccess(template));
      return template
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function deleteTemplate(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + `/templates/${id}`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data.templates
        }
      }
    )
    .then(campaigns => {
      dispatch(applicationIsLoading(false));
      dispatch(deleteTemplateAction());
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}




export function saveTemplate(data) {
  let dataSend = {template: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/templates', dataSend)
      .then(res => {
        dispatch(saveTemplateAction(res))
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


export function updateTemplate(data) {
  let dataSend = {template: data}
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.put(REACT_API_URL + `/templates/${data.id}`, dataSend)
      .then(res => {
        dispatch(saveTemplateAction(res))
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



