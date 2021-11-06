import GetListCarBusiness from '../../../bussiness/GetListCarBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';

export const getListCar =
  (start = 0, end = 5) =>
  async dispatch => {
    var getListCarBusiness = new GetListCarBusiness();
    var res = await getListCarBusiness.getListCarBusiness(start, end);

    if (res.status === STATUS.SUCCESS) {
      dispatch({
        type: ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_SUCCESS,
        data: res,
      });
    } else {
      dispatch({
        type: ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_FAIL,
        data: res,
      });
    }
  };
