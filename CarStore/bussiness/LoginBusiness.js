import { STATUS } from '../config/Status';
import { URL_HEROKU } from '../config/URL'
import PostService from '../service/PostService'
export default class LoginBusiness { 
  loginBusiness = async(data) =>  {
        var postService = new PostService();
        const url = URL_HEROKU + 'account/login' ;

        const params = {
          email : data.email , 
          password : data.password
        }
        var result = await postService.PostAPI(url , params);
        // if(result.status === STATUS.SUCCESS){
        //   resolve(result);
        // }
        // else{
        //   reject(result)
        // }
        return result ;
  }
}