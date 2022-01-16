import GetListCarBusiness from '../../../bussiness/GetListCarBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const getDetail = name => async dispatch => {
  var getListCarBusiness = new GetListCarBusiness();
  var res = await getListCarBusiness.getDetailCar(name);
  console.log('DETAIL ---', res);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.GET_DETAIL_CAR.GET_DETAIL_CAR_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.GET_DETAIL_CAR.GET_DETAIL_CAR_FAIL,
      data: res,
    });
  }
};
