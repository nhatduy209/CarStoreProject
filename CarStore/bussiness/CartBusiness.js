import {APP_URL} from '../config/URL';
import DeleteService from '../service/DeleteService';
import GetService from '../service/GetService';

export default class CartBusiness {
  getListCart = async email => {
    var getAPI = new GetService();
    const params = {
      email,
    };
    const result = await getAPI.getApiWithParams(APP_URL.GET_LIST_CART, params);

    return result;
  };

  deleteItem = async data => {
    var deleteAPI = new DeleteService();
    const params = {
      email: data.email,
      id: data.id,
    };
    const result = await deleteAPI.deleteAPI(APP_URL.DELETE_CART_ITEM, params);
    return result;
  };
}
