export function listings(state = [], action) {
  switch (action.type) {
    case 'LISTINGS_FETCH_DATA_SUCCESS':
        return action.listing;

    default:
        return state;
  }
}


export function integrationMethods(state = {}, action) {
  switch (action.type) {
    case 'INTEGRATION_DATA_FETCH_SUCCESS':
        return action.payload;

    default:
        return state;
  }
}

export function listingMemberData(state = [], action) {
  switch (action.type) {
    case 'MEMBER_FETCH_DATA_SUCCESS':
        return action.member.data;

    default:
        return state;
  }
}

export function listing(state = {}, action) {
  switch (action.type) {
    case 'SELECT_LISTINGS':
        return action.listing;

    case 'SAVE_LISTINGS':
        return action.listing;

    case 'LISTINGS_FETCH_SUCCESS':
       return action.listing

    case 'LISTINGS_DELETE_SUCCESS':
       return 'deleted'

    default:
        return state;
  }
}

export function inviteMemberData(state = [], action) {
  switch (action.type) {
    case 'INVITE_MEMBER_FETCH_DATA_SUCCESS':
        return action.member.data;

    default:
        return state;
  }
}

export function historyMemberData(state = [], action) {
  switch (action.type) {
    case 'HISTORY_MEMBER_FETCH_DATA_SUCCESS':
        return action.member.data;

    default:
        return state;
  }
}

export function searchMemberData(state = [], action) {
  switch (action.type) {
    case 'SEARCH_MEMBER_FETCH_DATA_SUCCESS':
        return action.member.data;

    default:
        return state;
  }
}
