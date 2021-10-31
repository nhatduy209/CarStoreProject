import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class ChangePasswordBusiness {
  changePasswordBusiness = async data => {
    var postService = new PostService();

    const params = {
      email: data.email,
      password: data.password,
    };
    var result = await postService.PostAPI(APP_URL.CHANGE_PASSWORD, params);

    console.log('RESULT ----', result);
    return result;
  };
}
