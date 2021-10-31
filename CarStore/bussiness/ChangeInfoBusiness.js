import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class ChangeInfoBusiness {
  changeInfoBusiness = async data => {
    var postService = new PostService();

    const params = {
      name: 'di',
      url: data.url,
      email: data.email,
      phone: data.phoneNum,
      address: data.address,
      password: '111',
    };
    var result = await postService.PostAPI(APP_URL.CHANGE_INFO, params);

    console.log('RESULT business ----', result.data);
    return result.data;
  };
}
