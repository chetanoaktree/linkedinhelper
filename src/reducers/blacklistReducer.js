export function blacklists(state = [], action) {
  switch (action.type) {
    case 'BLACKLIST_FETCH_DATA_SUCCESS':
        return action.blacklist;

    default:
        return state;
  }
}

export function blacklist(state = {}, action) {
  switch (action.type) {
    case 'SELECT_BLACKLIST':
        return action.blacklist;

    case 'SAVE_BLACKLIST':
        return action.blacklist;

    case 'BLACKLIST_FETCH_SUCCESS':
       return action.blacklist

    case 'BLACKLIST_DELETE_SUCCESS':
       return 'deleted'

    default:
        return state;
  }
}