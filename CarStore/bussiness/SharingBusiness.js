import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';

export default class SharingBusiness {
  share = async data => {
    console.log('Data + ' + JSON.stringify(data));
    var postService = new PostService();

    const params = {
      name: data.name.trim(),
      sender: data.sender,
    };

    var result = await postService.PostAPI(APP_URL.SHARING_ITEM, params);
    return result;
  };
}
