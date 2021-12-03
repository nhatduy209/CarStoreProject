import {ACTION_NAME} from './ActionName';
import {STATUS} from '../../../config/Status';
import BookingBusiness from '../../../bussiness/BookingBusiness';
export const createBooking = data => async dispatch => {
  console.log('data', data);
  var bookingBusiness = new BookingBusiness();
  const result = await bookingBusiness.booking(data.data);
  console.log('result', result);
  if (result.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.BOOKING_SUCCESS,
      data: result.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.BOOKING_FAIL,
      data: result.data,
    });
  }
};
export const changeShowModalState = (isShown = false) => {
  return {
    type: ACTION_NAME.BOOKING_ACTION.BOOKING_CHANGE_MODAL,
    data: isShown,
  };
};

export const cancelBooking = data => async dispatch => {
  var bookingBusiness = new BookingBusiness();
  const result = await bookingBusiness.cancel(data);
  if (result.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.CANCEL_BOOKING_SUCCESS,
      data: result.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.CANCEL_BOOKING_FAIL,
      data: result.data,
    });
  }
};

export const confirmBooking = data => async dispatch => {
  var bookingBusiness = new BookingBusiness();
  const result = await bookingBusiness.cofirm(data);
  if (result.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.CONFIRM_BOOKING_SUCCESS,
      data: result.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.CONFIRM_BOOKING_FAIL,
      data: result.data,
    });
  }
};

export const getMeetings = email => async dispatch => {
  var bookingBusiness = new BookingBusiness();
  const result = await bookingBusiness.getMeetings(email);
  if (result.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.GET_LIST_MEETINGS_SUCCESS,
      data: result.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.BOOKING_ACTION.GET_LIST_MEETINGS_FAIL,
      data: result.data,
    });
  }
};

export const reloadConfirm = () => dispatch => {
  dispatch({
    type: ACTION_NAME.BOOKING_ACTION.RELOAD_CONFIRM_BOOKING,
  });
};
