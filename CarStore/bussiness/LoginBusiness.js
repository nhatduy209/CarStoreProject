import { STATUS } from '../config/Status';
import { URL } from '../config/URL'
import PostService from '../service/PostService'
export default class LoginBusiness { 
  loginBusiness = async(data) =>  {
        var postService = new PostService();
        const url = URL + 'account/login' ;

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