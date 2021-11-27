import {ACTION_NAME} from '../action/get-list-car/ActionName';
import {ACTION_NAME as MANAGE_ACTION_NAME} from '../action/manage-item-action/ActionName';
import {STATUS} from '../../config/Status';
const CAR_STATE = {
  car: [],
  car_category: [],
  status_loading: STATUS.NONE,
  topchoice: [],
  newcar: [],
};

const CarReducer = (state = CAR_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_SUCCESS:
      if (action.data.data[0]?.name === state.car[0]?.name) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        car: [...state.car, ...action.data.data],
      };

    case ACTION_NAME.GET_LIST_NEWCAR.GET_LIST_NEWCAR_SUCCESS:
      console.log('NEW CAR --', action.data.data.data);
      if (action.data.data.data[0]?.name === state.newcar[0]?.name) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        newcar: [...state.newcar, ...action.data.data.data],
      };

    case ACTION_NAME.GET_LIST_TOPCHOICE.GET_LIST_TOPCHOICE_SUCCESS:
      if (action.data.data.data[0]?.name === state.topchoice[0]?.name) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        topchoice: [...state.topchoice, ...action.data.data.data],
      };

    case ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_FAIL:
      return {
        ...state,
        car: action.data,
      };

    case ACTION_NAME.GET_LIST_NEWCAR.GET_LIST_NEWCAR_FAIL:
      return {
        ...state,
        car: action.data,
      };

    case ACTION_NAME.GET_LIST_CAR_BY_CATEGORY.GET_LIST_CAR_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        car_category: [...action.data.data.data],
        status_loading: STATUS.SUCCESS,
      };
    case ACTION_NAME.GET_LIST_CAR_BY_CATEGORY.GET_LIST_CAR_BY_CATEGORY_FAIL:
      return {
        ...state,
        car_category: [],
      };
    case ACTION_NAME.GET_LIST_CAR_BY_CATEGORY.GET_LIST_CAR_BY_CATEGORY_RELOAD:
      return {
        ...state,
        car_category: [],
        status_loading: STATUS.NONE,
      };
    case ACTION_NAME.GET_LIST_CAR_BY_PRICE.GET_LIST_CAR_BY_PRICE_SUCCESS:
      return {
        ...state,
        car_price: action.data.data.data,
        status_loading: STATUS.SUCCESS,
      };
    case ACTION_NAME.GET_LIST_CAR_BY_PRICE.GET_LIST_CAR_BY_PRICE_FAIL:
      return {
        ...state,
        car_price: null,
      };
    case ACTION_NAME.GET_LIST_CAR_BY_PRICE.GET_LIST_CAR_BY_PRICE_RELOAD:
      return {
        ...state,
        car_price: null,
        status_loading: STATUS.NONE,
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
