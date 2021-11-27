import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';
import PaymentBusiness from '../../../bussiness/PaymentBusiness';

export const createPayment = data => async dispatch => {
  var paymentBusiness = new PaymentBusiness();
  var res = await paymentBusiness.createPayment(data);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.CREATE_PAYMENT.CREATE_PAYMENT_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.CREATE_PAYMENT.CREATE_PAYMENT_FAIL,
      data: res,
    });
  }
};
export const setStatusDefault = dispatch => {
  dispatch({
    type: ACTION_NAME.SET_STATUS_DEFAULT,
  });
};
