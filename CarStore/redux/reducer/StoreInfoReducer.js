import {ACTION_NAME} from '../action/store-info/ActionName';

const STORE_STATE = {
  storeInfo: {},
};

const StoreInfoReducer = (state = STORE_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_STORE_INFO.GET_STORE_INFO_SUCCESS:
      return {
        ...state,
        storeInfo: action.data,
      };
    case ACTION_NAME.GET_STORE_INFO.GET_STORE_INFO_FAIL:
      return {
        ...state,
        storeInfo: action.data,
      };
    case ACTION_NAME.EDIT_STORE_INFO.EDIT_STORE_INFO_SUCCESS:
      return {
        ...state,
        storeInfo: action.data,
      };
    case ACTION_NAME.EDIT_STORE_INFO.EDIT_STORE_INFO_FAIL:
      return {
        ...state,
        storeInfo: action.data,
      };
    default:
      return state;
  }
};

export default StoreInfoReducer;
