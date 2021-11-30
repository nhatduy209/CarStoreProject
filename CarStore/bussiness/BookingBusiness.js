import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';
import GetService from '../service/GetService';

export default class BookingBusiness {
  booking = async data => {
    var postAPI = new PostService();
    const params = {
      full_name: data.full_name,
      clients_email: data.clients_email,
      country: data.country,
      birthday: data.birthday,
      personal_id: data.personal_id,
      phone_number: data.phone_number,
      date_meeting: data.date_meeting,
      car_booking: {
        car_name: data.car_booking.car_name,
        image: data.car_booking.image,
        color: data.car_booking.color,
        prices: data.car_booking.prices,
        category: data.car_booking.category,
      },
    };
    const result = await postAPI.PostAPI(APP_URL.BOOKING, params);
    return result;
  };

  cancel = async data => {
    var postAPI = new PostService();
    const params = {
      id_meeting: data.id_meeting,
      email: data.email,
    };
    const result = await postAPI.PostAPI(APP_URL.CANCEL_BOOKING, params);
    console.log('result', result);
    return result;
  };

  cofirm = async data => {
    var postAPI = new PostService();
    const params = {
      id_meeting: data.id_meeting,
      clients_email: data.email,
    };
    const result = await postAPI.PostAPI(APP_URL.CONFIRM_BOOKING, params);
    return result;
  };

  getMeetings = async email => {
    var getAPI = new GetService();
    const params = {
      email,
    };
    const result = await getAPI.getApiWithParams(APP_URL.GET_MEETINGS, params);
    return result;
  };
}
