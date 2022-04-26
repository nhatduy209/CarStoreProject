import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';
import MessageBusiness from '../../../bussiness/MessageBusiness';

export const getInitMessage = email => async dispatch => {
  var messageBusiness = new MessageBusiness();
  var res = await messageBusiness.getInitMessage(email);

  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.GET_INT_MESSAGE.GET_INT_MESSAGE_SUCCESS,
      data: res.data.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.GET_INT_MESSAGE.GET_INT_MESSAGE_FAIL,
      data: res.data.data,
    });
  }
};

export const sendMessage = data => async dispatch => {
  var messageBusiness = new MessageBusiness();
  var res = await messageBusiness.sendMessage(data.data);

  if (res.result === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.SEND_MESSAGE.SEND_MESSAGE_SUCCESS,
      data: res.data,
    });
    data.onSuccess();
  } else {
    dispatch({
      type: ACTION_NAME.SEND_MESSAGE.SEND_MESSAGE_FAIL,
      data: res.data,
    });
  }
};
