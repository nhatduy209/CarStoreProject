import {ACTION_NAME} from './ActionName';
import {STATUS} from '../../../config/Status';
import ChangeInfoBusiness from '../../../bussiness/ChangeInfoBusiness';
import {uploadImageToStorage} from '../../../common/pushImage';
export const changeInfo = data => async dispatch => {
  if (data.Avatar) {
    data.data.url = await uploadImageToStorage(data.data.url, data.Avatar)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(() => {
        return '';
      });
  }

  var changeInfoBusiness = new ChangeInfoBusiness();
  const result = await changeInfoBusiness.changeInfoBusiness(data.data);
  if (result.data.result === STATUS.SUCCESS) {
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

export const reloađUpateStatus = () => dispatch => {
  dispatch({
    type: ACTION_NAME.RELOAD_UPLOAD,
    data: {},
  });
};
