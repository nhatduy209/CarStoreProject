import GetListCarBusiness from '../../../bussiness/GetListCarBusiness';
import {STATUS} from '../../../config/Status';
import {NAME_ACTIONS} from './ActionName';

export const getHistoryItem = email => async dispatch => {
  var addToCart = new GetListCarBusiness();
  var res = await addToCart.getListHistoryItemsBusiness(email);

  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: NAME_ACTIONS.GET_HISTORY_ITEM.GET_HISTORY_ITEM_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.GET_HISTORY_ITEM.GET_HISTORY_ITEM_FAIL,
      data: res,
    });
  }
};
