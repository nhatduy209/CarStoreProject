import {URL_HEROKU} from '../config/URL';
import PostService from '../service/PostService';
export default class RecoverPasswordBusiness {
  recoverPasswordBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'account/recoverpassword';

    const params = {
      email: data.email,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
}
