import { URL_HEROKU } from '../config/URL';
import DeleteService from '../service/DeleteService';
import GetService from '../service/GetService'

export default class CartBusiness {
  getListCart = async ( email ) => {
    var  getAPI = new GetService();
    const url =  URL_HEROKU + 'cart/getlist' 
    const params = {
      email,
    }
    const result = await getAPI.getApiWithParams(url ,params );

    return result ; 
  }

  deleteItem = async ( data ) => {
    var  deleteAPI = new DeleteService();
    const url =  URL_HEROKU + 'cart/delete' 
    const params = {
      email : data.email,
      id : data.id 
    }
    const result = await deleteAPI.deleteAPI(url ,params );
    return result ; 
  }
}