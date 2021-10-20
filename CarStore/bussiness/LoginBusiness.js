import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class LoginBusiness {
  loginBusiness = async data => {
    var postService = new PostService();

    const params = {
      email: data.email,
      password: data.password,
    };
    var result = await postService.PostAPI(APP_URL.LOGIN, params);
    return result;
  };

  loginWithEmailBusiness = async data => {
    var postService = new PostService();

    const params = {
      email: data.email,
      displayName: data.displayName,
      photoURL: data.displayName,
    };
    var result = await postService.PostAPI(APP_URL.LOGIN_WITH_EMAIL, params);
    return result;
  };
}
