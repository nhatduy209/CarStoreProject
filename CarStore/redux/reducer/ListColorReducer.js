import {ACTION_NAME} from '../action/list-color/ListColorAction';

const COLOR_STATE = {
  colors: [],
};

const ListColorReducer = (state = COLOR_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.ADD_COLOR:
      return {
        ...state,
        colors: action.data,
      };
    case ACTION_NAME.SET_DEFAULT_LIST_COLOR:
      return {
        colors: [],
      };
    default:
      return state;
  }
};

export default ListColorReducer;
