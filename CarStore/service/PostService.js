import axios from 'axios';

export default class PostService {
  PostAPI = async (url, params) => {
    const response = await axios.post(url, {params});
    return {
      data: response.data,
      status: response.data.result,
    };
  };
}
