import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class LoginBusiness {
  loginBusiness = async data => {
    var postService = new PostService();

    const params = {
      email: data.email,
      password: data.password,
      tokenDevice: data.tokenDevice,
      role: data.role,
    };
    var result = await postService.PostAPI(APP_URL.LOGIN, params);
    return result;
  };

  loginWithEmailBusiness = async (data, token) => {
    var postService = new PostService();

    const params = {
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
      tokenDevice: token,
    };
    var result = await postService.PostAPI(APP_URL.LOGIN_WITH_EMAIL, params);
    return result;
  };

  logoutBusiness = async data => {
    var postService = new PostService();

    const params = {
      email: data.email,
      tokenDevice: data.tokenDevice,
    };
    var result = await postService.PostAPI(APP_URL.LOGOUT, params);
    return result;
  };
}
