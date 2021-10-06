import axios from 'axios';
import {STATUS} from '../config/Status';

export default class DeleteService {
  deleteAPI = async (url, params) => {
    try {
      const response = await axios.delete(url, {params});
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
