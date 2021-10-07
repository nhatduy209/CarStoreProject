import {ACTION_NAME} from '../action/search-car/ActionName';

const CAR_SEARCH = {
  car: {},
};

const SearchReducer = (state = CAR_SEARCH, action) => {
  switch (action.type) {
    case ACTION_NAME.SEARCH_ACTION.SEARCH_ACTION_SUCCESS:
      return {
        ...state,
        car: action.data,
      };
    case ACTION_NAME.SEARCH_ACTION.SEARCH_ACTION_FAIL:
      return {
        ...state,
        car: action.data,
      };
    default:
      return state;
  }
};

export default SearchReducer;
