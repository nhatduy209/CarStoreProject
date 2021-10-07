import { URL_HEROKU } from '../config/URL'
import PostService from '../service/PostService'
export default class SignUpBusiness { 
  signUpBusiness = async(data) =>  {
        var postService = new PostService();
        const url = URL_HEROKU + 'account/register' ;

    const params = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
}
