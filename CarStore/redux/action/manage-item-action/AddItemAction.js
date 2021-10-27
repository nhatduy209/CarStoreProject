import ManageItemBusiness from '../../../bussiness/ManageItemBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const addItem = data => async dispatch => {
  var manageItem = new ManageItemBusiness();
  console.log('action', data);
  var res = await manageItem.addItemBusiness(data);

  console.log('res', res);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.ADD_ITEM_ACTION.ADD_ITEM_ACTION_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.ADD_ITEM_ACTION.ADD_ITEM_ACTION_FAIL,
      data: res,
    });
  }
};
