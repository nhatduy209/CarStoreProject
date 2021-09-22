import SignUpBusiness from '../../../bussiness/SignUpBusiness';
import { ACTION_NAME } from './ActionName'

export const signUp = (data) => async dispatch => {
  console.log('SIGNUP ACTION ----' , data)
  var signUpBusiness = new SignUpBusiness();
  const res = await signUpBusiness.signUpBusiness(data);
  dispatch({
    type : ACTION_NAME.SIGNUP_ACTION.SIGNUP_ACTION,
    data : res
  } )
}