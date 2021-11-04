import {APP_URL} from '../config/URL';
import PostService from '../service/PostService';

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
      },
    };
    const result = await postAPI.PostAPI(APP_URL.BOOKING, params);
    return result;
  };

  cancel = async data => {
    var postAPI = new PostService();
    const params = {
      id_meeting: data.id_meeting,
      email: data.clients_email,
    };
    const result = await postAPI.PostAPI(APP_URL.CANCEL_BOOKING, params);
    console.log('-----RESULT-------', result);
    return result;
  };
}
