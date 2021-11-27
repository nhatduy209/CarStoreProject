import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
export default class ChangeInfoBusiness {
  changeInfoBusiness = async data => {
    var postService = new PostService();
    const params = {
      name: data.name,
      image: data.url,
      email: data.email,
      phone: data.phoneNum,
      address: data.address,
      password: data.password,
      gender: data.gender,
      birthday: data.date,
    };
    var result = await postService.PostAPI(APP_URL.CHANGE_INFO, params);

    console.log('RESULT business ----', result);
    return result;
  };
}
