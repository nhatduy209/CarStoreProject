import {STATUS, unauthoriedMessage} from '../../config/Status';
import {ACTION_NAME} from '../action/cart-action/ActionName';

const CART_STATE = {
  cart: {},
  status: STATUS.FAIL,
};

const CartReducer = (state = CART_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_LIST_CART_ACTION.GET_LIST_CART_SUCCESS:
      return {
        ...state,
        cart: action.data,
        status: STATUS.SUCCESS,
      };
    case ACTION_NAME.GET_LIST_CART_ACTION.GET_LIST_CART_FAIL:
      return {
        ...state,
        cart: {},
        status: STATUS.FAIL,
      };
    case ACTION_NAME.DELETE_CART_ACTION.DELETE_CART_ACTION_SUCCESS:
      return {
        ...state,
        status: 'DELETE_SUCCESS',
      };
    case ACTION_NAME.DELETE_CART_ACTION.DELETE_CART_ACTION_FAIL:
      return {
        ...state,
        status: 'DELETE_FAIL',
      };
    case ACTION_NAME.ADD_TO_CART_ACTION.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        status: 'ADD_SUCCESS',
      };
    case ACTION_NAME.ADD_TO_CART_ACTION.ADD_TO_CART_FAIL:
      console.log('action data' + JSON.stringify(action.data.data.error));
      return {
        ...state,
        status:
          unauthoriedMessage === action.data.data.error
            ? STATUS.UNAUTHORIED
            : 'ADD_FAIL',
      };
    default:
      return state;
  }
};

export default CartReducer;
