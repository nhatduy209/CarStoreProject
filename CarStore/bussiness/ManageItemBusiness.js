import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class ManageItemBusiness {
  addItemBusiness = async data => {
    var postService = new PostService();

    const params = {
      name: data.name,
      category: data.category,
      width: data.width,
      height: data.height,
      length: data.length,
      description: data.description,
      color: data.color,
    };
    var result = await postService.PostAPI(APP_URL.MANAGE_ADD_ITEM, params);

    console.log('RESULT ----', result);
    return result;
  };
}
