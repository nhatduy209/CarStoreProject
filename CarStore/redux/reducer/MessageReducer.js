import {ACTION_NAME} from '../action/message/ActionName';

const STORE_STATE = {
  messages: [],
  reciverId: '',
  senderId: '',
};

const MessageReducer = (state = STORE_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_INT_MESSAGE.GET_INT_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: action.data.message,
        reciverId: action.data?.idSendingFromAdmin,
        senderId: action.data?.idSendingFromClient,
      };
    case ACTION_NAME.GET_INT_MESSAGE.GET_INT_MESSAGE_FAIL:
      return {
        ...state,
        messages: [],
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
