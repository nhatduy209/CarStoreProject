import LoginBusiness from '../../../bussiness/LoginBusiness';
import SignUpBusiness from '../../../bussiness/SignUpBusiness';
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
export const signUp = (data) => async dispatch => {
  console.log('SIGNUP ACTION ----' , data)
  var signUpBusiness = new SignUpBusiness();
  const res = await signUpBusiness.signUpBusiness(data);
  dispatch({
    type : ACTION_NAME.SIGNUP_ACTION.SIGNUP_ACTION,
    data : res
  } )
}