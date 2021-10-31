import {ACTION_NAME} from '../action/get-list-car/ActionName';
import {ACTION_NAME as MANAGE_ACTION_NAME} from '../action/manage-item-action/ActionName';
const CAR_STATE = {
  car: {},
};

const CarReducer = (state = CAR_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_SUCCESS:
      return {
        ...state,
        car: action.data,
      };
    case ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_FAIL:
      return {
        ...state,
        car: action.data,
      };
    case MANAGE_ACTION_NAME.ADD_ITEM_ACTION.ADD_ITEM_ACTION_SUCCESS:
      return {
        ...state,
        reload: true,
      };
    case MANAGE_ACTION_NAME.ADD_ITEM_ACTION.ADD_ITEM_ACTION_FAIL:
      return {
        ...state,
      };
    case MANAGE_ACTION_NAME.ADD_COLOR_ACTION.ADD_COLOR_ACTION_SUCCESS:
      return {
        ...state,
      };
    case MANAGE_ACTION_NAME.ADD_COLOR_ACTION.ADD_COLOR_ACTION_FAIL:
      return {
        ...state,
      };
    case MANAGE_ACTION_NAME.UPDATE_ITEM_ACTION.UPDATE_ITEM_ACTION_SUCCESS:
      return {
        ...state,
        reload: true,
      };
    case MANAGE_ACTION_NAME.UPDATE_ITEM_ACTION.UPDATE_ITEM_ACTION_FAIL:
      return {
        ...state,
      };
    case MANAGE_ACTION_NAME.UPDATE_QUANTITY_ACTION
      .UPDATE_QUANTITY_ACTION_SUCCESS:
      return {
        ...state,
      };
    case MANAGE_ACTION_NAME.UPDATE_QUANTITY_ACTION.UPDATE_QUANTITY_ACTION_FAIL:
      return {
        ...state,
      };
    case MANAGE_ACTION_NAME.RELOADED_LIST:
      return {
        ...state,
        reload: false,
      };
    case MANAGE_ACTION_NAME.REMOVE_ITEM_ACTION.REMOVE_ITEM_ACTION_SUCCESS:
      return {
        ...state,
        reload: true,
      };
    case MANAGE_ACTION_NAME.REMOVE_ITEM_ACTION.REMOVE_ITEM_ACTION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default CarReducer;
