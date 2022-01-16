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

  getNewCarBusiness = async (start, end) => {
    const params = {
      start,
      end,
    };
    var getService = new GetService();

    var result = await getService.getApiWithParams(
      APP_URL.GET_LIST_NEW_CAR,
      params,
    );

    return result;
  };

  getTopChoiceCarBusiness = async (start, end) => {
    const params = {
      start,
      end,
    };
    var getService = new GetService();

    var result = await getService.getApiWithParams(
      APP_URL.GET_LIST_TOP_CHOICE,
      params,
    );

    return result;
  };

  getListCarByPriceBusiness = async (minPrices, maxPrices, category) => {
    var postService = new PostService();
    const params = {
      minPrices,
      maxPrices,
      category,
    };

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

  getListHistoryItemsBusiness = async email => {
    const params = {
      email,
    };
    var getService = new GetService();
    var result = await getService.getApiWithParams(
      APP_URL.GET_HISTORY_ITEM,
      params,
    );

    return result;
  };

  getDetailCar = async name => {
    const params = {
      name,
    };
    var getService = new GetService();
    var result = await getService.getApiWithParams(
      APP_URL.GET_DETAIL_CAR,
      params,
    );

    return result;
  };
}
