import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class AddToCartBusiness {
  addToCartBusiness = async data => {
    var postService = new PostService();

    const params = {
      email: data.email,
      name: data.name,
      color: data.color,
      quantity: data.quantity,
      price: data.price,
      carImage: data.url,
    };
    var result = await postService.PostAPI(APP_URL.ADD_TO_CART, params);

    console.log('RESULT ----', result);
    return result;
  };
}
