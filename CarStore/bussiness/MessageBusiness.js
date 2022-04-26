import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class MessageBusiness {
  getInitMessage = async email => {
    var postService = new PostService();

    var result = await postService.PostAPI(APP_URL.GET_INIT_MESSAGE, {
      username: email,
    });
    return result;
  };
  sendMessage = async data => {
    var postService = new PostService();

    var result = await postService.PostAPI(APP_URL.SEND_MESSAGE, data);
    return result.data;
  };
}
