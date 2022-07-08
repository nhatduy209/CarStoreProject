import {APP_URL} from '../config/URL';
import GetService from '../service/GetService';
import PostService from '../service/PostService';

export default class CommentBusiness {
  getListCommentBusiness = async name => {
    var getService = new GetService();

    const params = {
      name,
    };
    var result = await getService.getApiWithParams(
      APP_URL.GET_LIST_COMMENT,
      params,
    );

    console.log('RESULT ----', result);
    return result;
  };

  addCommentBusiness = async data => {
    var postService = new PostService();

    const params = {
      name: data.car_name,
      email: data.email,
      rating: data.rating,
      comment: data.comment,
      idBill: data.idBill,
    };
    var result = await postService.PostAPI(APP_URL.ADD_COMMENT, params);

    return result.data;
  };
}
