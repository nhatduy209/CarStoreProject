import {ACTION_NAME} from './ActionName';

export const reloadListItem = () => dispatch => {
  dispatch({
    type: ACTION_NAME.RELOADED_LIST,
  });
};
