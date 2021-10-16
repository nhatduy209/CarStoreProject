import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/booking/ActionName';

const BOOKING_STATE = {
  STATUS_BOOKING: STATUS.FAIL,
};

const BookingReducer = (state = BOOKING_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.BOOKING_ACTION.BOOKING_SUCCESS:
      return {
        ...state,
        STATUS_BOOKING: STATUS.SUCCESS,
      };
    case ACTION_NAME.BOOKING_ACTION.BOOKING_FAIL:
      return {
        ...state,
        STATUS_BOOKING: STATUS.FAIL,
      };
    default:
      return state;
  }
};

export default BookingReducer;
