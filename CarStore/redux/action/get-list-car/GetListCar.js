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

export const getListCarByCategory =
  (start = 0, end = 5, category) =>
  async dispatch => {
    var getListCarBusiness = new GetListCarBusiness();
    var res = await getListCarBusiness.getListCarByCategoryBusiness(
      start,
      end,
      category,
    );

    if (res.status === STATUS.SUCCESS) {
      dispatch({
        type: ACTION_NAME.GET_LIST_CAR_BY_CATEGORY
          .GET_LIST_CAR_BY_CATEGORY_SUCCESS,
        data: res,
      });
    } else {
      dispatch({
        type: ACTION_NAME.GET_LIST_CAR_BY_CATEGORY
          .GET_LIST_CAR_BY_CATEGORY_FAIL,
        data: res,
      });
    }
  };

export const getListCarByPrice = (min, max) => async dispatch => {
  var getListCarBusiness = new GetListCarBusiness();
  var res = await getListCarBusiness.getListCarByPriceBusiness(min, max);
  console.log('res', res);
  if (res.result === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.GET_LIST_CAR_BY_PRICE.GET_LIST_CAR_BY_PRICE_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.GET_LIST_CAR_BY_PRICE.GET_LIST_CAR_BY_PRICE_FAIL,
      data: res,
    });
  }
};

export const reloadListCarCategory = () => async dispatch => {
  dispatch({
    type: ACTION_NAME.GET_LIST_CAR_BY_CATEGORY.GET_LIST_CAR_BY_CATEGORY_RELOAD,
    data: {},
  });
};
