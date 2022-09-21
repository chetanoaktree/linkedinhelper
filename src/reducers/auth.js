import isEmpty from 'lodash/isEmpty'
import { SET_CURRENT_USER, USER_EXIST, USER_FETCH_DATA_SUCCESS, SAVE_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  hunter: {},
  error: ''
}

export function auth(state = initialState, action = {}) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        error: ''
      }
    case USER_EXIST: {
      return {
        ...state,
        error: action.error
      }
    }
    case USER_FETCH_DATA_SUCCESS: {
      return {
        ...state,
        hunter: action.user
      }
    }
    case SAVE_USER: {
      return {
        ...state,
        hunter: action.user
      }
    }
    default: return state;
  }
}


export function planList(state = [], action) {
  switch (action.type) {
    case "PLAN_FETCH_DATA_SUCCESS":
        return action.plans;

    default:
        return state;
  }
}