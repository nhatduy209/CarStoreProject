/* eslint-disable no-shadow */
import AddToCartBusiness from '../../../bussiness/AddToCartBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const addToCart = data => async dispatch => {
  var addToCart = new AddToCartBusiness();
  var res = await addToCart.addToCartBusiness(data);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.ADD_TO_CART.ADD_TO_CART_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.ADD_TO_CART.ADD_TO_CART_FAIL,
      data: res,
    });
  }
};
