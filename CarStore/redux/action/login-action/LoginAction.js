import LoginBusiness from '../../../bussiness/LoginBusiness';
import {ACTION_NAME} from './ActionName';

export const login = (email, password) => async dispatch => {
  console.log('LOGIN ACTION ----', email);
  var loginBusiness = new LoginBusiness();
  const data = await loginBusiness.loginBusiness({email, password});
  dispatch({
    type: ACTION_NAME.LOGIN_ACTION.LOGIN_ACTION,
    data,
  });
};

export const loginWithEmail = data => async dispatch => {
  var loginBusiness = new LoginBusiness();
  const resultdata = await loginBusiness.loginWithEmailBusiness(data);
  console.log('DATA LOGIN EMAIL ACTION ----', resultdata);
  dispatch({
    type: ACTION_NAME.LOGIN_ACTION.LOGIN_ACTION,
    data: resultdata,
  });
};
