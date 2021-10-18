import {ACTION_NAME} from './ActionName';
import {STATUS} from '../../../config/Status';
import BookingBusiness from '../../../bussiness/BookingBusiness';
export const createBooking = data => async dispatch => {
  var bookingBusiness = new BookingBusiness();
  const result = bookingBusiness.booking(data.data);
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
