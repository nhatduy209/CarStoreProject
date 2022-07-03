export const URL_HEROKU = 'https://nodejs-cars.herokuapp.com/';
export const ngrokUrl = 'https://371f-42-115-124-132.ngrok.io/';

export const APP_URL = {
  LOGIN: URL_HEROKU + 'account/login',
  LOGIN_WITH_EMAIL: URL_HEROKU + 'account/loginwithgmail',
  CHANGE_INFO: URL_HEROKU + 'account/changeinfo',
  CHANGE_PASSWORD: URL_HEROKU + 'account/changepassword',
  ADD_TO_CART: URL_HEROKU + 'cart/add',
  GET_LIST_CART: URL_HEROKU + 'cart/getlist',
  DELETE_CART_ITEM: URL_HEROKU + 'cart/delete',
  BOOKING: URL_HEROKU + 'meetings/create',
  CANCEL_BOOKING: URL_HEROKU + 'meetings/cancel',
  CONFIRM_BOOKING: URL_HEROKU + 'meetings/confirm',
  GET_LIST_CAR: URL_HEROKU + 'car',
  GET_LIST_NEW_CAR: URL_HEROKU + 'car/newcar',
  GET_LIST_TOP_CHOICE: URL_HEROKU + 'car/topchoice',
  GET_LIST_SALEOFF: URL_HEROKU + 'car/saleof',
  GET_LIST_CAR_BY_CATEGORY: URL_HEROKU + 'car/filtercategory',
  GET_LIST_CAR_BY_PRICE: URL_HEROKU + 'car/filterprice',
  GET_LIST_CATEGORY: URL_HEROKU + 'category/getlist',
  MANAGE_ADD_ITEM: URL_HEROKU + 'car/add',
  RECOVERY_PASSWORD: URL_HEROKU + 'account/recoverpassword',
  SEARCH_CAR: URL_HEROKU + 'car/search',
  SIGN_UP: URL_HEROKU + 'account/register',
  GET_STORE_INFO: URL_HEROKU + 'store/getinfo',
  EDIT_STORE_INFO: URL_HEROKU + 'store/editinfo',
  ADD_ITEM: URL_HEROKU + 'car/add',
  UPDATE_ITEM: URL_HEROKU + 'car/update',
  ADD_NEW_COLOR: URL_HEROKU + 'car/addnewcolor',
  UPDATE_QUANTITY: URL_HEROKU + 'car/updatequantity',
  REMOVE_ITEM: URL_HEROKU + 'car/remove',
  LOGOUT: URL_HEROKU + 'account/logout',
  GET_MEETINGS: URL_HEROKU + 'meetings/getmeetings',
  CREATE_PAYMENT: URL_HEROKU + 'payment/create',
  GET_HISTORY_ITEM: URL_HEROKU + 'account/gethistoryitems',
  GET_LIST_COMMENT: URL_HEROKU + 'car/listcomment',
  ADD_COMMENT: URL_HEROKU + 'car/addcomment',
  GET_DETAIL_CAR: URL_HEROKU + 'car/getdetail',
  GET_INIT_MESSAGE: URL_HEROKU + 'message/initmessage',
  SEND_MESSAGE: URL_HEROKU + 'message/sendingmessage',
  SHARING_ITEM: URL_HEROKU + 'message/share',
};
