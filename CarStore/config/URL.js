export const URL_HEROKU = 'https://nodejs-cars.herokuapp.com/';

export const APP_URL = {
  LOGIN: URL_HEROKU + 'account/login',
  LOGIN_WITH_EMAIL: URL_HEROKU + 'account/loginwithgmail',
  CHANGE_INFO: URL_HEROKU + 'account/changeinfo',
  CHANGE_PASSWORD: URL_HEROKU + 'account/changepassword',
  ADD_TO_CART: URL_HEROKU + 'cart/add',
  GET_LIST_CART: URL_HEROKU + 'cart/getlist',
  DELETE_CART_ITEM: URL_HEROKU + 'cart/delete',
  BOOKING: URL_HEROKU + 'meetings/create',
  GET_LIST_CAR: URL_HEROKU + 'car',
  GET_LIST_CATEGORY: URL_HEROKU + 'category/getlist',
  MANAGE_ADD_ITEM: URL_HEROKU + 'car/add',
  RECOVERY_PASSWORD: URL_HEROKU + 'account/recoverpassword',
  SEARCH_CAR: URL_HEROKU + 'car/search',
  SIGN_UP: URL_HEROKU + 'account/register',
  GET_STORE_INFO: URL_HEROKU + 'store/getinfo',
  EDIT_STORE_INFO: URL_HEROKU + 'store/editinfo',
};
