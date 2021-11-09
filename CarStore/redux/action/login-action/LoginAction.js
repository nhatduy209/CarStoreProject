import LoginBusiness from '../../../bussiness/LoginBusiness';
import {ACTION_NAME} from './ActionName';

export const login = (email, password, tokenDevice) => async dispatch => {
  var loginBusiness = new LoginBusiness();
  const data = await loginBusiness.loginBusiness({
    email,
    password,
    tokenDevice,
  });
  dispatch({
    type: ACTION_NAME.LOGIN_ACTION.LOGIN_ACTION,
    data,
  });
};

export const loginWithEmail = data => async dispatch => {
  var loginBusiness = new LoginBusiness();
  const resultdata = await loginBusiness.loginWithEmailBusiness(data);
  dispatch({
    type: ACTION_NAME.LOGIN_ACTION.LOGIN_ACTION,
    data: resultdata,
  });
};

export const logout = (email, tokenDevice) => async dispatch => {
  var loginBusiness = new LoginBusiness();
  const data = await loginBusiness.logoutBusiness({email, tokenDevice});
  dispatch({
    type: ACTION_NAME.LOGOUT_ACTION,
    data,
  });
};
