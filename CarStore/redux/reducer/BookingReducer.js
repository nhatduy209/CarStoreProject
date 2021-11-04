import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/booking/ActionName';

const BOOKING_STATE = {
  STATUS_BOOKING: STATUS.FAIL,
  CANCEL_BOOKING: STATUS.FAIL,
  showModal: false,
};

const BookingReducer = (state = BOOKING_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.BOOKING_ACTION.BOOKING_SUCCESS:
      return {
        ...state,
        STATUS_BOOKING: STATUS.SUCCESS,
        showModal: true,
        message: 'You have just made an apointment successfully',
      };
    case ACTION_NAME.BOOKING_ACTION.BOOKING_FAIL:
      return {
        ...state,
        STATUS_BOOKING: STATUS.FAIL,
        showModal: true,
        data: action.data,
        message: 'Your booking apointment is fail',
      };
    case ACTION_NAME.BOOKING_ACTION.BOOKING_CHANGE_MODAL:
      return {
        ...state,
        showModal: action.data,
      };
    case ACTION_NAME.BOOKING_ACTION.CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        CANCEL_BOOKING: STATUS.SUCCESS,
      };
    case ACTION_NAME.BOOKING_ACTION.CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        CANCEL_BOOKING: STATUS.FAIL,
      };
    default:
      return state;
  }
};

export default BookingReducer;
