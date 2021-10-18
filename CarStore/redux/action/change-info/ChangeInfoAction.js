import {ACTION_NAME} from './ActionName';
import {STATUS} from '../../../config/Status';
import ChangeInfoBusiness from '../../../bussiness/ChangeInfoBusiness';
export const changeInfo = data => async dispatch => {
  var changeInfoBusiness = new ChangeInfoBusiness();
  const result = await changeInfoBusiness.changeInfoBusiness(data);
  console.log('changee', result);
  if (result.result === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.CHANGE_INFO_ACTION.CHANGE_INFO_SUCCESS,
      data: result,
    });
  } else {
    dispatch({
      type: ACTION_NAME.CHANGE_INFO_ACTION.CHANGE_INFO_FAIL,
      data: result,
    });
  }
};
