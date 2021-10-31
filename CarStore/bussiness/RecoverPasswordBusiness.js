import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class RecoverPasswordBusiness {
  recoverPasswordBusiness = async data => {
    var postService = new PostService();

    const params = {
      email: data.email,
    };
    var result = await postService.PostAPI(APP_URL.RECOVERY_PASSWORD, params);

    console.log('RESULT ----', result);
    return result;
  };
}
