import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';

export default class PaymentBusiness {
  createPayment = async data => {
    var postService = new PostService();
    const params = {
      client: data.client,
      car: data.car,
      admin: data.admin,
    };
    const result = await postService.PostAPI(APP_URL.CREATE_PAYMENT, params);
    console.log('result----', result);
    return result;
  };
}
