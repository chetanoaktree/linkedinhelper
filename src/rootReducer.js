import { combineReducers } from 'redux';

import { applicationIsLoading, userData } from './reducers/applicationReducer';
import { campaigns, campaign, selectedCampaigns, campaignPlay, selectedCampaignPlay, selectedCampaignPlayEmail, connectALLSuccess, connectedData, scrapingData, memberData } from './reducers/campaignReducer';
import { templates, template } from './reducers/templateReducer';
import { blacklists, blacklist } from './reducers/blacklistReducer';
import { listings, integrationMethods, listing, listingMemberData, inviteMemberData, historyMemberData, searchMemberData  } from './reducers/listingReducer';
import { dashboardData } from './reducers/dashboardReducer';
import { logsData } from './reducers/logsReducer';
import { actionData } from './reducers/settingReducer';
import {auth, planList} from './reducers/auth';

export default combineReducers({
  applicationIsLoading,
  auth,
  campaigns,
  campaign,
  selectedCampaigns,
  campaignPlay,
  selectedCampaignPlay,
  selectedCampaignPlayEmail,
  connectALLSuccess,
  connectedData,
  scrapingData,
  memberData,
  dashboardData,
  userData,
  templates,
  template,
  blacklists,
  blacklist,
  listings,
  listing,
  listingMemberData,
  logsData,
  planList,
  inviteMemberData,
  integrationMethods,
  actionData,
  historyMemberData,
  searchMemberData
});
