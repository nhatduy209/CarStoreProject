import {URL_HEROKU} from '../config/URL';
import PostService from '../service/PostService';
export default class ManageItemBusiness {
  addItemBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'car/add';

    const params = {
      name: data.name,
      category: data.category,
      width: data.width,
      height: data.height,
      length: data.length,
      description: data.description,
      color: data.color,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
}
