import ManageItemBusiness from '../../../bussiness/ManageItemBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const updateItem = data => async dispatch => {
  var manageItem = new ManageItemBusiness();
  var res = await manageItem.updateItemBusiness(data);

  console.log('res', res);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.UPDATE_ITEM_ACTION.UPDATE_ITEM_ACTION_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.UPDATE_ITEM_ACTION.UPDATE_ITEM_ACTION_FAIL,
      data: res,
    });
  }
};
