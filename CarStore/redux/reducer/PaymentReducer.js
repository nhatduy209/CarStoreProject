import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/payment-action/ActionName';

const PAYMENT_STATE = {
  payment: {},
  status: STATUS.FAIL,
};

const PaymentReducer = (state = PAYMENT_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.CREATE_PAYMENT.CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        status: STATUS.SUCCESS,
      };
    case ACTION_NAME.CREATE_PAYMENT.CREATE_PAYMENT_FAIL:
      return {
        ...state,
        status: STATUS.FAIL,
        message: action.data.message,
      };
    case ACTION_NAME.SET_STATUS_DEFAULT:
      return {
        ...state,
        status: STATUS.FAIL,
      };
    default:
      return state;
  }
};

export default PaymentReducer;
