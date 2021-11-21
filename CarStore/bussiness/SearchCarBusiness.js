import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';

export default class SearchCarBusiness {
  searchCar = async data => {
    var postService = new PostService();

    const params = {
      name: data.name.trim(),
    };

    var result = await postService.PostAPI(APP_URL.SEARCH_CAR, params);
    return result;
  };
}
