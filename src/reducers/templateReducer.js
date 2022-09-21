export function templates(state = [], action) {
  switch (action.type) {
    case 'TEMPLATE_FETCH_DATA_SUCCESS':
        return action.templates;

    default:
        return state;
  }
}

export function template(state = {}, action) {
  switch (action.type) {
    case 'SELECT_TEMPLATE':
        return action.template;

    case 'SAVE_TEMPLATE':
        return action.template;

    case 'TEMPLATE_FETCH_SUCCESS':
       return action.template

    case 'TEMPLATE_DELETE_SUCCESS':
       return 'deleted'

    default:
        return state;
  }
}