import { APPLICATION_IS_LOADING, SET_USER_DATA } from '../actions/types';

export function applicationIsLoading(state = false, action) {
  // console.log('=====action',action)
  switch (action.type) {
    case APPLICATION_IS_LOADING:
        return action.isLoading;

    default:
        return state;
  }
}

export function userData(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA:
        return action.user;

    default:
        return state;
  }
}
