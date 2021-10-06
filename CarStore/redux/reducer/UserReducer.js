import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/login-action/ActionName';

const USER_STATE = {
  user: {
    status: STATUS.FAIL,
  },
};

const UserReducer = (state = USER_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.LOGIN_ACTION.LOGIN_ACTION:
      return {
        ...state,
        user: action.data,
      };
    case ACTION_NAME.SIGNUP_ACTION.SIGNUP_ACTION:
      return {
        ...state,
        user: action.data,
      };
    case ACTION_NAME.RECOVERPASSWORD_ACTION.RECOVERPASSWORD_ACTION:
      return {
        ...state,
        recoverCode: action.data,
      };
    case ACTION_NAME.CHANGEPASSWORD_ACTION.CHANGEPASSWORD_ACTION:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};

export default UserReducer;
