import { STATUS } from '../config/Status';
import { URL_HEROKU } from '../config/URL'
import PostService from '../service/PostService'
export default class ChangePasswordBusiness { 
    changePasswordBusiness = async(data) =>  {
        var postService = new PostService();
        const url = URL_HEROKU + 'account/changepassword' ;

        const params = {
          email:data.email,
          password:data.password,
        }
        var result = await postService.PostAPI(url , params);

        console.log("RESULT ----" , result )
        return result ;
  }
}