import RecoverPasswordBusiness from '../../../bussiness/RecoverPasswordBusiness';
import {ACTION_NAME} from './ActionName';

export const recoverpassword = data => async dispatch => {
  console.log('RECOVER PASSWORD ACTION ----', data);
  var recoverPasswordBusiness = new RecoverPasswordBusiness();
  const res = await recoverPasswordBusiness.recoverPasswordBusiness(data);
  dispatch({
    type: ACTION_NAME.RECOVERPASSWORD_ACTION.RECOVERPASSWORD_ACTION,
    data: {...res, ...data},
  });
};
