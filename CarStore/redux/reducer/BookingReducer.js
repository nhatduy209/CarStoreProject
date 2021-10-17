import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/booking/ActionName';

const BOOKING_STATE = {
  STATUS_BOOKING: STATUS.FAIL,
  showModal: false,
};

const BookingReducer = (state = BOOKING_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.BOOKING_ACTION.BOOKING_SUCCESS:
      action.action();
      return {
        ...state,
        STATUS_BOOKING: STATUS.SUCCESS,
        showModal: true,
        data: action.data,
      };
    case ACTION_NAME.BOOKING_ACTION.BOOKING_FAIL:
      return {
        ...state,
        STATUS_BOOKING: STATUS.FAIL,
        showModal: true,
        data: action.data,
      };
    case ACTION_NAME.BOOKING_ACTION.BOOKING_CHANGE_MODAL:
      return {
        ...state,
        showModal: action.data,
      };
    default:
      return state;
  }
};

export default BookingReducer;
