import { STATUS } from '../config/Status';
import { URL_HEROKU } from '../config/URL'
import PostService from '../service/PostService'
export default class AddToCartBusiness { 
    addToCartBusiness = async(data) =>  {
        var postService = new PostService();
        const url = URL_HEROKU + 'cart/add' ;

        const params = {
          email:data.email,
          name:data.name,
          color:data.color,
          quantity:data.quantity,
          price:data.price
        }
        var result = await postService.PostAPI(url , params);

        console.log("RESULT ----" , result )
        return result ;
  }
}