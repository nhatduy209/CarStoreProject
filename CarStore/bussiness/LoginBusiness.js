import {URL_HEROKU} from '../config/URL';
import PostService from '../service/PostService';
export default class LoginBusiness {
  loginBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'account/login';

    const params = {
      email: data.email,
      password: data.password,
    };
    var result = await postService.PostAPI(url, params);
    return result;
  };

  loginWithEmailBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'account/loginwithgmail';

    const params = {
      email: data.email,
      displayName: data.displayName,
      photoURL: data.displayName,
    };
    var result = await postService.PostAPI(url, params);
    return result;
  };
}
