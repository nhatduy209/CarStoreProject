import {APP_URL} from '../config/URL';
import GetService from '../service/GetService';
export default class GetListCarBusiness {
  getListCarBusiness = async () => {
    var getService = new GetService();

    var result = await getService.getAPI(APP_URL.GET_LIST_CAR);
    return result;
  };
}
