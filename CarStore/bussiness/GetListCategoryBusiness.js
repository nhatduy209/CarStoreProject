import {URL_HEROKU} from '../config/URL';
import GetService from '../service/GetService';
export default class GetListCategoryBusiness {
  getListCategoryBusiness = async () => {
    var getService = new GetService();
    const url = URL_HEROKU + 'category/getlist';
    var result = await getService.getAPI(url);
    return result;
  };
}
