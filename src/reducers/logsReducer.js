import { LOGS_FETCH_SUCCESS } from '../constants/types';

export function logsData(state = [], action) {
  switch (action.type) {
    case LOGS_FETCH_SUCCESS:
        return action.logData.data;

    default:
        return state;
  }
}