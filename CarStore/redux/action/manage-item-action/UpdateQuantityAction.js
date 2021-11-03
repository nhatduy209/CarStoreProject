import ManageItemBusiness from '../../../bussiness/ManageItemBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const updateQuantity = data => async dispatch => {
  var manageItem = new ManageItemBusiness();
  var res = await manageItem.updateQuantityBusiness(data);

  console.log('res', res);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.UPDATE_QUANTITY_ACTION.UPDATE_QUANTITY_ACTION_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.UPDATE_QUANTITY_ACTION.UPDATE_QUANTITY_ACTION_FAIL,
      data: res,
    });
  }
};
