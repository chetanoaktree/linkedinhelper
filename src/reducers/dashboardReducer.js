import { DASHBOARD_FETCH_DATA_SUCCESS } from '../constants/types';


export function dashboardData(state = {}, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DATA_SUCCESS:
        return action.getData.data;

    default:
        return state;
  }
}