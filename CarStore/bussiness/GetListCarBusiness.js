import {URL_HEROKU} from '../config/URL';
import GetService from '../service/GetService';
export default class GetListCarBusiness {
  getListCarBusiness = async () => {
    var getService = new GetService();
    const url = URL_HEROKU + 'car';

    var result = await getService.getAPI(url);
    return result;
  };
}
