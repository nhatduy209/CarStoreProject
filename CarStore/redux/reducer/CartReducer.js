import {ACTION_NAME} from '../action/add-to-cart/ActionName';

const CART_STATE = {
  cart: {},
};

const CartReducer = (state = CART_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.ADD_TO_CART.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: action.data,
      };
    case ACTION_NAME.ADD_TO_CART.ADD_TO_CART_FAIL:
      return {
        ...state,
        cart: action.data,
      };
    default:
      return state;
  }
};

export default CartReducer;
