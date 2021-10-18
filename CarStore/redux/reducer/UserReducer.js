import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/login-action/ActionName';
import {ACTION_NAME as CHANGE_INFO_ACTION_NAME} from '../action/change-info/ActionName';
import {REHYDRATE} from 'redux-persist';
const USER_STATE = {
  user: {
    status: STATUS.FAIL,
  },
};

const UserReducer = (state = USER_STATE, action) => {
  switch (action.type) {
    case REHYDRATE:
      console.log('RELOAD _----', action.payload?.user);
      return {
        ...state,
        user: action.payload?.user,
      };

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
    case ACTION_NAME.LOGIN_WITH_EMAIL_ACTION.LOGIN_WITH_EMAIL_ACTION_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case ACTION_NAME.LOGIN_WITH_EMAIL_ACTION.LOGIN_WITH_EMAIL_ACTION_FAIL:
      return {
        ...state,
        status: true,
        user: action.data,
      };
    case CHANGE_INFO_ACTION_NAME.CHANGE_INFO_ACTION.CHANGE_INFO_SUCCESS:
      return {
        ...state,
        user: {data: action.data, status: 'SUCCESS'},
      };
    case CHANGE_INFO_ACTION_NAME.CHANGE_INFO_ACTION.CHANGE_INFO_FAIL:
      return {
        ...state,
        user: {data: action.data, status: 'SUCCESS'},
      };
    default:
      return state;
  }
};

export default UserReducer;
