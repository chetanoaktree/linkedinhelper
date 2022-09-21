import { CAMPAIGN_FETCH_DATA_SUCCESS, SELECTED_CAMPAIGN_UPDATED, CAMPAIGN_PLAY_FETCH_DATA_SUCCESS, SELECTED_CAMPAIGN_PLAY_UPDATED, SELECTED_CAMPAIGN_PLAY_EMAIL, CONNECT_CAMPAIGN_PLAY_EMAIL, CONNECTED_FETCH_DATA_SUCCESS, SCRAPING_FETCH_DATA_SUCCESS, MEMBER_FETCH_DATA_SUCCESS, CAMPAIGN_DELETE_SUCCESS, CAMPAIGN_FETCH_SUCCESS } from '../constants/types';

export function campaigns(state = [], action) {
  switch (action.type) {
    case CAMPAIGN_FETCH_DATA_SUCCESS: {
        return action.campaigns;
    }

    default:
        return state;
  }
}

export function campaign(state = {}, action) {
  switch (action.type) {
    
    case CAMPAIGN_FETCH_SUCCESS:
       return action.campaign

    case CAMPAIGN_DELETE_SUCCESS:
       return 'deleted'

    default:
        return state;
  }
}


export function selectedCampaigns(state = [], action) {
  // console.log(action)
  switch (action.type) {
    case SELECTED_CAMPAIGN_UPDATED:
        return action.campaigns;

    default:
        return state;
  }
}

export function campaignPlay(state = [], action) {
  // console.log(action)
  switch (action.type) {
    case CAMPAIGN_PLAY_FETCH_DATA_SUCCESS:
        return action.campaignPlay;

    default:
        return state;
  }
}

export function selectedCampaignPlay(state = [], action) {
  // console.log(action)
  switch (action.type) {
    case SELECTED_CAMPAIGN_PLAY_UPDATED:
        return action.campaignPlay;

    default:
        return state;
  }
}

export function selectedCampaignPlayEmail(state = [], action) {
  // console.log(action)
  switch (action.type) {
    case SELECTED_CAMPAIGN_PLAY_EMAIL:
        return action.campaignPlay;

    default:
        return state;
  }
}

export function connectALLSuccess(state = [], action) {
  // console.log(action)
  switch (action.type) {
    case CONNECT_CAMPAIGN_PLAY_EMAIL:
        return action.campaignPlay;

    default:
        return state;
  }
}

export function connectedData(state = [], action) {
  switch (action.type) {
    case CONNECTED_FETCH_DATA_SUCCESS:
        return action.connected.data;

    default:
        return state;
  }
}

export function scrapingData(state = [], action) {
  switch (action.type) {
    case SCRAPING_FETCH_DATA_SUCCESS:
        return action.scraping.data;

    default:
        return state;
  }
}

export function memberData(state = {}, action) {
  switch (action.type) {
    case MEMBER_FETCH_DATA_SUCCESS:
        return action.member.data;

    default:
        return state;
  }
}