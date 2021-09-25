import { URL_HEROKU } from '../config/URL';
import PostService from '../service/PostService'

export default class SearchCarBusiness {
  searchCar = async ( data ) => {
    var postService = new PostService();
    var URL_Search = URL_HEROKU + '/car/search';


    const params = {
      name : data.name , 
    }

    var result = await postService.PostAPI( URL_Search, params);
    return result ;
  }
}