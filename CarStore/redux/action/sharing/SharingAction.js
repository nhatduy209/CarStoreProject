import SharingBusiness from '../../../bussiness/SharingBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const share = async data => {
  var sharingBusiness = new SharingBusiness();
  var result = await sharingBusiness.share(data);

  console.log('result sharing ----' + result);
  if (result.status === STATUS.SUCCESS) {
    // dispatch({
    //   type: ACTION_NAME.SHARE_ACTION.SHARE_ACTION_SUCCESS,
    //   data: result.data.data,
    // });
    return {
      type: ACTION_NAME.SHARE_ACTION.SHARE_ACTION_SUCCESS,
      data: result.data.data,
    };
  } else {
    // dispatch({
    //   type: ACTION_NAME.SHARE_ACTION.SHARE_ACTION_FAIL,
    //   data: result.data.data,
    // });
    return {
      type: ACTION_NAME.SHARE_ACTION.SHARE_ACTION_FAIL,
      data: result.data.data,
    };
  }
};
