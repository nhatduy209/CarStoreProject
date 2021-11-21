import {APP_URL} from '../config/URL';
import GetService from '../service/GetService';
import PostService from '../service/PostService';
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

  getListCarByPriceBusiness = async (minPrices, maxPrices) => {
    const params = {
      minPrices,
      maxPrices,
    };
    var postService = new PostService();
    console.log('p', params, APP_URL.GET_LIST_CAR_BY_PRICE);
    var result = await postService.PostAPI(
      APP_URL.GET_LIST_CAR_BY_PRICE,
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
