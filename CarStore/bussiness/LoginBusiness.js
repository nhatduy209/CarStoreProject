import { STATUS } from '../config/Status';
import { URL } from '../config/URL'
import PostService from '../service/PostService'
export default class LoginBusiness { 
  loginBusiness = async(data) =>  {
        var postService = new PostService();
        const url = "http://cfbe-2001-ee0-4fc5-b0e0-f0a4-f3d2-ee7a-3d16.ngrok.io/" + 'account/login' ;

        const params = {
          email : data.email , 
          password : data.password
        }
        var result = await postService.PostAPI(url , params);

        console.log("RESULT ----" , result )
        // if(result.status === STATUS.SUCCESS){
        //   resolve(result);
        // }
        // else{
        //   reject(result)
        // }
        return result ;
  }
}