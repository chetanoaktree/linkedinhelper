//Settings

export function actionData(state = [], action) {
  switch (action.type) {
    case "ACTION_FETCH_SUCCESS":
        return action.actionData;

    default:
        return state;
  }
}

