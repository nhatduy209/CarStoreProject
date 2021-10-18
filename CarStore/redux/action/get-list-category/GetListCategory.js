import GetListCategoryBusiness from '../../../bussiness/GetListCategoryBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const getListCategory = () => async dispatch => {
  var getListCategoryBusiness = new GetListCategoryBusiness();
  var res = await getListCategoryBusiness.getListCategoryBusiness();

  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.GET_LIST_CATEGORY.GET_LIST_CATEGORY_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.GET_LIST_CATEGORY.GET_LIST_CATEGORY_FAIL,
      data: res,
    });
  }
};
