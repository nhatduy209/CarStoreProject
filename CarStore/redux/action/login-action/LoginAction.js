import LoginBusiness from '../../../bussiness/LoginBusiness';
import {ACTION_NAME} from './ActionName';

export const login =
  (email, password, tokenDevice, role = 'member') =>
  async dispatch => {
    var loginBusiness = new LoginBusiness();
    const data = await loginBusiness.loginBusiness({
      email,
      password,
      tokenDevice,
      role,
    });
    dispatch({
      type: ACTION_NAME.LOGIN_ACTION.LOGIN_ACTION,
      data,
    });
  };

export const loginWithEmail = (data, token) => async dispatch => {
  var loginBusiness = new LoginBusiness();
  const resultdata = await loginBusiness.loginWithEmailBusiness(data, token);
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

export const reload = () => async dispatch => {
  dispatch({
    type: ACTION_NAME.RELOAD_LOGIN_STATUS,
    data: {},
  });
};
