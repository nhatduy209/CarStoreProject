import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/booking/ActionName';

const BOOKING_STATE = {
  STATUS_BOOKING: STATUS.FAIL,
  CANCEL_BOOKING: STATUS.FAIL,
  showModal: false,
  meetings: {},
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
    case ACTION_NAME.BOOKING_ACTION.CONFIRM_BOOKING_SUCCESS:
      return {
        ...state,
        confirmStatus: STATUS.SUCCESS,
      };
    case ACTION_NAME.BOOKING_ACTION.RELOAD_CONFIRM_BOOKING:
      return {
        ...state,
        confirmStatus: STATUS.FAIL,
      };
    case ACTION_NAME.BOOKING_ACTION.CONFIRM_BOOKING_FAIL:
      return {
        ...state,
        confirmStatus: STATUS.FAIL,
      };
    case ACTION_NAME.BOOKING_ACTION.CANCEL_BOOKING_FAIL:
      return {
        ...state,
        CANCEL_BOOKING: STATUS.FAIL,
      };

    case ACTION_NAME.BOOKING_ACTION.GET_LIST_MEETINGS_SUCCESS:
      console.log('DATA MEETINGS ---', action.data);
      return {
        ...state,
        meetings: action.data.data,
      };
    case ACTION_NAME.BOOKING_ACTION.GET_LIST_MEETINGS_FAIL:
      return {
        ...state,
        meetings: [],
      };
    default:
      return state;
  }
};

export default BookingReducer;
