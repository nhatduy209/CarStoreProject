import {APP_URL} from '../config/URL';
import GetService from '../service/GetService';
export default class GetListCarBusiness {
  getListCarBusiness = async (start, end) => {
    const params = {
      start,
      end,
    };
    var getService = new GetService();

    var result = await getService.getApiWithParams(
      APP_URL.GET_LIST_CAR,
      params,
    );

    return result;
  };

  getListCarByCategoryBusiness = async (start, end, category) => {
    const params = {
      start,
      end,
      category,
    };
    var getService = new GetService();

    var result = await getService.getApiWithParams(
      APP_URL.GET_LIST_CAR_BY_CATEGORY,
      params,
    );

    return result;
  };
}
