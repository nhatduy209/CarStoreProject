import {URL_HEROKU} from '../config/URL';
import PostService from '../service/PostService';
export default class ChangeInfoBusiness {
  changeInfoBusiness = async data => {
    var postService = new PostService();
    const url = URL_HEROKU + 'account/changeinfo';

    const params = {
      name: 'di',
      url: data.url,
      email: data.email,
      phone: data.phoneNum,
      address: data.address,
      password: '111',
    };
    var result = await postService.PostAPI(url, params);

    console.log('RESULT business ----', result.data);
    return result.data;
  };
}
