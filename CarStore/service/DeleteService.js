import axios from 'axios';
import {_retrieveData} from '../common/Utils';
import {AUTHENTICATION_TOKEN} from '../config/StorageKey';
import {STATUS} from '../config/Status';

export default class DeleteService {
  deleteAPI = async (url, params) => {
    try {
      const token_authen = await _retrieveData(AUTHENTICATION_TOKEN);
      const response = await axios.delete(url, {
        headers: {
          token: token_authen ?? 'undefined', //the token is a variable which holds the token
        },
        params,
      });
      return {
        data: response.data,
        status: STATUS.SUCCESS,
      };
    } catch (err) {
      console.log('response----', err);
      return {
        data: {},
        status: STATUS.FAIL,
      };
    }
  };
}
