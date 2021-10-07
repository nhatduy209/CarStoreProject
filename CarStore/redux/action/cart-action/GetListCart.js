import CartBusiness from '../../../bussiness/CartBusiness';
import {ACTION_NAME} from './ActionName';
import {STATUS} from '../../../config/Status';
export const getListCartActon = email => async dispatch => {
  var cartBusiness = new CartBusiness();
  const result = await cartBusiness.getListCart(email);

  if (result.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.GET_LIST_CART_ACTION.GET_LIST_CART_SUCCESS,
      data: result.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.GET_LIST_CART_ACTION.GET_LIST_CART_FAIL,
      data: result.data,
    });
  }
};

export const deleteItem = data => async dispatch => {
  var cartBusiness = new CartBusiness();
  const result = await cartBusiness.deleteItem(data);

  console.log('RESULT-------', result);
  if (result.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.DELETE_CART_ACTION.DELETE_CART_ACTION_SUCCESS,
      data: result.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.DELETE_CART_ACTION.DELETE_CART_ACTION_FAIL,
      data: result.data,
    });
  }
};
