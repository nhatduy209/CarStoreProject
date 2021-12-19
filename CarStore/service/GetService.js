import axios from 'axios';
import {STATUS} from '../config/Status';
import {AUTHENTICATION_TOKEN} from '../config/StorageKey';
import {_retrieveData} from '../common/Utils';

export default class GetService {
  getAPI = async url => {
    try {
      const response = await axios.get(url);

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

  getApiWithParams = async (url, params) => {
    try {
      const token_authen = await _retrieveData(AUTHENTICATION_TOKEN);
      const response = await axios.get(
        url,
        {params},
        {
          headers: {
            token: token_authen ?? 'undefined', //the token is a variable which holds the token
          },
        },
      );
      return {
        data: response.data,
        status: STATUS.SUCCESS,
      };
    } catch (err) {
      return {
        data: {},
        status: STATUS.FAIL,
      };
    }
  };
}
