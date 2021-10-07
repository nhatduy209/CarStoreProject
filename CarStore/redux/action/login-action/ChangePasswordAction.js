import ChangePasswordBusiness from '../../../bussiness/ChangePasswordBusiness';
import {ACTION_NAME} from './ActionName';

export const changepassword = data => async dispatch => {
  console.log('Change PASSWORD ACTION ----', data);
  var changePasswordBusiness = new ChangePasswordBusiness();
  const res = await changePasswordBusiness.changePasswordBusiness(data);
  dispatch({
    type: ACTION_NAME.CHANGEPASSWORD_ACTION.CHANGEPASSWORD_ACTION,
    data: res,
  });
};
