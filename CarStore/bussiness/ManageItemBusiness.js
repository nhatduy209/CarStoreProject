import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class ManageItemBusiness {
  addItemBusiness = async data => {
    var postService = new PostService();
    const params = {
      name: data.name,
      category: data.category,
      width: data.width,
      height: data.height,
      length: data.length,
      description: data.description,
      color: data.color,
      price: data.prices,
      img: data.color[0].url,
    };
    var result = await postService.PostAPI(APP_URL.ADD_ITEM, params);

    console.log('RESULT ----', result);
    return result;
  };
  updateItemBusiness = async data => {
    var postService = new PostService();
    const params = {
      name: data.name,
      category: data.category,
      width: data.width,
      height: data.height,
      length: data.length,
      description: data.description,
      price: data.prices,
      img: data.color[0].url ?? '',
    };
    var result = await postService.PostAPI(APP_URL.UPDATE_ITEM, params);

    console.log('RESULT ----', result);
    return result;
  };
  addColorBusiness = async data => {
    var postService = new PostService();
    const params = {
      name: data.name,
      arrayColor: data.color,
    };
    var result = await postService.PostAPI(APP_URL.ADD_NEW_COLOR, params);

    console.log('RESULT ----', result);
    return result;
  };
  updateQuantityBusiness = async data => {
    var postService = new PostService();
    const params = {
      name: data.name,
      numberInStore: data.numberInStore,
      color: data.color,
    };
    var result = await postService.PostAPI(APP_URL.UPDATE_QUANTITY, params);

    console.log('RESULT ----', result);
    return result;
  };
  removeItemBusiness = async data => {
    var postService = new PostService();
    const params = {
      name: data,
    };
    var result = await postService.PostAPI(APP_URL.REMOVE_ITEM, params);

    console.log('RESULT ----', result);
    return result;
  };
}
