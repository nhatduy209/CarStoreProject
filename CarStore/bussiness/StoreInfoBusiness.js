import {APP_URL} from '../config/URL';
import GetService from '../service/GetService';
import PostService from '../service/PostService';
export default class StoreInfoBusiness {
  getStoreInfoBusiness = async () => {
    var getService = new GetService();

    var result = await getService.getAPI(APP_URL.GET_STORE_INFO);
    return result;
  };
  editStoreInfoBusiness = async data => {
    var postService = new PostService();

    var result = await postService.PostAPI(APP_URL.EDIT_STORE_INFO, data);
    return result;
  };
}
