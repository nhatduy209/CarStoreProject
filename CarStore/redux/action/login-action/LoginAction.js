import LoginBusiness from '../../../bussiness/LoginBusiness';
import { ACTION_NAME } from './ActionName'

export const login = (email , password ) => async dispatch => {
  console.log('LOGIN ACTION ----' , email);
  var loginBusiness = new LoginBusiness();
  const data = await loginBusiness.loginBusiness({email, password });
  dispatch({
    type : ACTION_NAME.LOGIN_ACTION.LOGIN_ACTION,
    data : { email , password}
  }
  )
}