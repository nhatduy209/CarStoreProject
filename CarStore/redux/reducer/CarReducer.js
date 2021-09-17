import {ACTION_NAME} from '../action/get-list-car/ActionName';

const CAR_STATE = {
  car: {},
};

const CarReducer = (state = CAR_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_SUCCESS:
      return {
        ...state,
        car: action.data,
      };
    case ACTION_NAME.GET_LIST_CAR.GET_LIST_CAR_FAIL:
      return {
        ...state,
        car: action.data,
      };
    default:
      return state;
  }
};

export default CarReducer;
