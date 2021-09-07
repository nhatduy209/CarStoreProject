import { STATUS } from '../config/Status';
import { URL } from '../config/URL'
import PostService from '../service/PostService'
export default class SignUpBusiness { 
  signUpBusiness = async(data) =>  {
        var postService = new PostService();
        const url = "http://8c6e-2001-ee0-4fc5-b0e0-9d42-8d0e-ad4e-526c.ngrok.io/" + 'account/register' ;

        const params = {
          name:data.name,
          email:data.email,
          phone:data.phone,
          password:data.password,
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