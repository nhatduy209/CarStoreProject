import axios from 'axios';
import {STATUS} from '../config/Status';

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
      const response = await axios.get(url, {params});
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
