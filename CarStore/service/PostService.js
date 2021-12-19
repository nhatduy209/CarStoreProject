import axios from 'axios';
import {_retrieveData} from '../common/Utils';
import {AUTHENTICATION_TOKEN} from '../config/StorageKey';

export default class PostService {
  PostAPI = async (url, params) => {
    const token_authen = await _retrieveData(AUTHENTICATION_TOKEN);
    const response = await axios.post(
      url,
      {params},
      {
        headers: {
          token: token_authen ?? 'undefined', //the token is a variable which holds the token
        },
      },
    );
    console.log('RESPONSE----', response.data);
    return {
      data: response.data,
      status: response.data.result,
    };
  };
}
