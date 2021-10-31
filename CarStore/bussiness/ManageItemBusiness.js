import {URL_HEROKU} from '../config/URL';
import PostService from '../service/PostService';
export default class ManageItemBusiness {
  addItemBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'car/add';
    const params = {
      name: data.name,
      category: data.category,
      width: data.width,
      height: data.height,
      length: data.length,
      description: data.description,
      color: data.color,
      price: data.prices,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
  updateItemBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'car/update';
    const params = {
      name: data.name,
      category: data.category,
      width: data.width,
      height: data.height,
      length: data.length,
      description: data.description,
      price: data.prices,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
  addColorBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'car/addnewcolor';
    const params = {
      name: data.name,
      arrayColor: data.color,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
  updateQuantityBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'car/updatequantity';
    const params = {
      name: data.name,
      numberInStore: data.numberInStore,
      color: data.color,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
  removeItemBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'car/remove';
    const params = {
      name: data,
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT ----', result);
    return result;
  };
}
