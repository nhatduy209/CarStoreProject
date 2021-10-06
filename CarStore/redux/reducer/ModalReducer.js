import {ACTION_NAME} from '../action/show-modal/ShowModalAction';

const ModalReducer = (state = false, action) => {
  switch (action.type) {
    case ACTION_NAME.SHOW_MODAL_NOT_LOGIN:
      return {
        isShow: action.data,
      };
    case ACTION_NAME.SHOW_MODAL_NOT_LOGIN:
      return {
        isShow: action.data,
      };
    default:
      return state;
  }
};

export default ModalReducer;
