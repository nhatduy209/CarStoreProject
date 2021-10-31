import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class SignUpBusiness {
  signUpBusiness = async data => {
    var postService = new PostService();

    const params = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    var result = await postService.PostAPI(APP_URL.SIGN_UP, params);
    console.log('RESULT ----', result);
    return result;
  };
}
