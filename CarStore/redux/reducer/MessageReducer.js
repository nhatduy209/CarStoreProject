import {STATUS, unauthoriedMessage} from '../../config/Status';
import {ACTION_NAME} from '../action/message/ActionName';

const STORE_STATE = {
  messages: [],
  status: STATUS.NONE,
  reciverId: '',
  senderId: '',
};

const MessageReducer = (state = STORE_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_INT_MESSAGE.GET_INT_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: action.data.data?.message,
        reciverId: action.data?.data?.idSendingFromAdmin,
        senderId: action.data?.data?.idSendingFromClient,
        status: STATUS.SUCCESS,
      };
    case ACTION_NAME.GET_INT_MESSAGE.GET_INT_MESSAGE_FAIL:
      if (action.data.error === unauthoriedMessage) {
        return {
          ...state,
          status: STATUS.UNAUTHORIED,
          messages: [],
        };
      }
      return {
        ...state,
        messages: [],
        status: STATUS.FAIL,
      };
    case ACTION_NAME.SEND_MESSAGE.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
      };
    case ACTION_NAME.SEND_MESSAGE.SEND_MESSAGE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default MessageReducer;
