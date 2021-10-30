import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';
import StoreInfoBusiness from '../../../bussiness/StoreInfoBusiness';

export const getStoreInfo = () => async dispatch => {
  var storeInfoBusiness = new StoreInfoBusiness();
  var res = await storeInfoBusiness.getStoreInfoBusiness();

  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.GET_STORE_INFO.GET_STORE_INFO_SUCCESS,
      data: res.data.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.GET_STORE_INFO.GET_STORE_INFO_FAIL,
      data: res.data.data,
    });
  }
};

export const editStoreInfo = data => async dispatch => {
  var storeInfoBusiness = new StoreInfoBusiness();
  var res = await storeInfoBusiness.editStoreInfoBusiness(data);

  if (res.result === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.EDIT_STORE_INFO.EDIT_STORE_INFO_SUCCESS,
      data: res.data.data,
    });
  } else {
    dispatch({
      type: ACTION_NAME.EDIT_STORE_INFO.EDIT_STORE_INFO_FAIL,
      data: res.data.data,
    });
  }
};
