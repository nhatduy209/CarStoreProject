import {ACTION_NAME} from '../action/get-list-category/ActionName';

const CATEGORY_STATE = {
  category: {},
};

const CategoryReducer = (state = CATEGORY_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_LIST_CATEGORY.GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.data,
      };
    case ACTION_NAME.GET_LIST_CATEGORY.GET_LIST_CATEGORY_FAIL:
      return {
        ...state,
        category: action.data,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
