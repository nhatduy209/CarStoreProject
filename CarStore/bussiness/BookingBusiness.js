import {URL_HEROKU} from '../config/URL';
import PostService from '../service/PostService';

export default class BookingBusiness {
  booking = async data => {
    var postAPI = new PostService();
    const url = URL_HEROKU + 'meetings/create';
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
    const result = await postAPI.PostAPI(url, params);
    console.log('-----RESULT-------', result);
    return result;
  };
}
